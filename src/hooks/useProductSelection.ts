import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  PlanOption,
  Product,
  ProductCategory,
  ReviewLineItem,
  SelectionMap,
} from '../types/product.types'

const STORAGE_KEY = 'bundle-builder-state'
const MIN_QUANTITY = 0
const MAX_QUANTITY = 99

interface StoredBundleState {
  selectedPlanId: string
  selection: Record<string, {
    activeColorId: string | null
    quantities: Record<string, number>
  }>
}

const getProductVariantIds = (product: Product) =>
  product.colors.length > 0 ? product.colors.map((color) => color.id) : ['default']

const getDefaultActiveColorId = (product: Product) =>
  product.defaultColorId ?? product.colors[0]?.id ?? 'default'

const buildSelectionMap = (
  products: Product[],
  initialState?: StoredBundleState
): SelectionMap =>
  products.reduce<SelectionMap>((acc, product) => {
    const variantIds = getProductVariantIds(product)
    const activeColorId =
      initialState?.selection?.[product.id]?.activeColorId ??
      getDefaultActiveColorId(product)

    const quantities: Record<string, number> = {}
    variantIds.forEach((variantId) => {
      const savedQuantity = initialState?.selection?.[product.id]?.quantities?.[variantId]
      const defaultQuantity =
        variantId === activeColorId ? product.defaultQuantity : 0

      quantities[variantId] =
        typeof savedQuantity === 'number' ? savedQuantity : defaultQuantity
    })

    acc[product.id] = {
      activeColorId,
      quantities,
    }
    return acc
  }, {})

const loadSavedState = (
  products: Product[],
  plans: PlanOption[]
): { selectedPlanId: string; selection: SelectionMap; saved: boolean } => {
  if (typeof window === 'undefined') {
    return {
      selectedPlanId: plans[0]?.id ?? '',
      selection: buildSelectionMap(products),
      saved: false,
    }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        selectedPlanId: plans[0]?.id ?? '',
        selection: buildSelectionMap(products),
        saved: false,
      }
    }

    const parsed = JSON.parse(raw) as StoredBundleState
    const planIsValid = plans.some((plan) => plan.id === parsed.selectedPlanId)
    return {
      selectedPlanId: planIsValid ? parsed.selectedPlanId : plans[0]?.id ?? '',
      selection: buildSelectionMap(products, parsed),
      saved: true,
    }
  } catch {
    return {
      selectedPlanId: plans[0]?.id ?? '',
      selection: buildSelectionMap(products),
      saved: false,
    }
  }
}

export const useProductSelection = (products: Product[], plans: PlanOption[]) => {
  const { selectedPlanId: initialPlanId, selection: initialSelection, saved: initialSaved } =
    loadSavedState(products, plans)

  const [selection, setSelection] = useState<SelectionMap>(initialSelection)
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId)
  const [saved, setSaved] = useState<boolean>(initialSaved)

  useEffect(() => {
    const handleStorage = () => {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as StoredBundleState
      const planIsValid = plans.some((plan) => plan.id === parsed.selectedPlanId)
      setSelectedPlanId(planIsValid ? parsed.selectedPlanId : plans[0]?.id ?? '')
      setSelection(buildSelectionMap(products, parsed))
      setSaved(true)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [plans, products])

  const saveBundle = useCallback(() => {
    const state: StoredBundleState = {
      selectedPlanId,
      selection: Object.fromEntries(
        Object.entries(selection).map(([productId, selectionEntry]) => [
          productId,
          {
            activeColorId: selectionEntry.activeColorId,
            quantities: selectionEntry.quantities,
          },
        ])
      ),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setSaved(true)
  }, [selectedPlanId, selection])

  const setActiveVariant = useCallback((productId: string, variantId: string) => {
    setSelection((prev) => {
      const productSelection = prev[productId]
      if (!productSelection) return prev
      return {
        ...prev,
        [productId]: {
          ...productSelection,
          activeColorId: variantId,
        },
      }
    })
  }, [])

  const updateQuantity = useCallback((productId: string, variantId: string, delta: number) => {
    setSelection((prev) => {
      const productSelection = prev[productId]
      if (!productSelection) return prev
      const current = productSelection.quantities[variantId] ?? 0
      const next = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, current + delta))
      return {
        ...prev,
        [productId]: {
          ...productSelection,
          quantities: {
            ...productSelection.quantities,
            [variantId]: next,
          },
        },
      }
    })
  }, [])

  const increment = useCallback((productId: string, variantId: string) => {
    updateQuantity(productId, variantId, 1)
  }, [updateQuantity])

  const decrement = useCallback((productId: string, variantId: string) => {
    updateQuantity(productId, variantId, -1)
  }, [updateQuantity])

  const selectPlan = useCallback((planId: string) => {
    setSelectedPlanId(planId)
  }, [])

  const selectedLineItems = useMemo<ReviewLineItem[]>(() => {
    return products.flatMap((product) => {
      const productSelection = selection[product.id]
      if (!productSelection) return []

      return Object.entries(productSelection.quantities)
        .filter(([, quantity]) => quantity > 0)
        .map(([variantId, quantity]) => ({
          id: `${product.id}:${variantId}`,
          productId: product.id,
          variantId,
          variantName:
            product.colors.find((color) => color.id === variantId)?.name ??
            (variantId === 'default' ? null : null),
          image: product.image,
          name: product.name,
          pricing: product.pricing,
          quantity,
          category: product.category,
        }))
    })
  }, [products, selection])

  const subtotal = useMemo(
    () =>
      products.reduce((sum, product) => {
        const productSelection = selection[product.id]
        if (!productSelection) return sum
        return (
          sum +
          Object.entries(productSelection.quantities).reduce((productSum, [, quantity]) => {
            return productSum + quantity * product.pricing.sale
          }, 0)
        )
      }, 0),
    [products, selection]
  )

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0],
    [plans, selectedPlanId]
  )

  const shippingCost = 5.99

  const total = useMemo(
    () => subtotal + (selectedPlan?.salePrice ?? 0),
    [subtotal, selectedPlan]
  )

  const originalTotal = useMemo(() => {
    const planOriginal = selectedPlan?.originalPrice ?? 0
    return subtotal + planOriginal + shippingCost
  }, [subtotal, selectedPlan, shippingCost])

  const savings = useMemo(() => originalTotal - total, [originalTotal, total])

  const selectedCounts = useMemo(() => {
    const counts: Record<ProductCategory | 'plan', number> = {
      camera: 0,
      sensor: 0,
      accessory: 0,
      plan: selectedPlanId ? 1 : 0,
    }

    selectedLineItems.forEach((item) => {
      counts[item.category] += 1
    })

    return counts
  }, [selectedLineItems, selectedPlanId])

  return {
    selection,
    activeVariantByProduct: Object.fromEntries(
      Object.entries(selection).map(([productId, entry]) => [productId, entry.activeColorId ?? 'default'])
    ),
    setActiveVariant,
    increment,
    decrement,
    selectedPlanId,
    selectPlan,
    saveBundle,
    saved,
    selectedLineItems,
    selectedCounts,
    subtotal,
    selectedPlan: selectedPlan ?? plans[0],
    shippingCost,
    total,
    originalTotal,
    savings,
  }
}
