import { useCallback, useMemo, useState } from 'react'
import type { Product, SelectionMap } from '../types/product.types'

const MIN_QUANTITY = 0
const MAX_QUANTITY = 99

const buildInitialSelection = (products: Product[]): SelectionMap =>
  products.reduce<SelectionMap>((acc, product) => {
    acc[product.id] = {
      colorId: product.defaultColorId,
      quantity: product.defaultQuantity,
    }
    return acc
  }, {})

/**
 * Owns all selection state (chosen color + quantity per product) for the
 * "Choose your cameras" step, and exposes memoized handlers so child
 * <ProductCard /> components can stay wrapped in React.memo without
 * re-rendering on every keystroke/click elsewhere in the tree.
 */
export const useProductSelection = (products: Product[]) => {
  const [selection, setSelection] = useState<SelectionMap>(() =>
    buildInitialSelection(products)
  )

  const selectColor = useCallback((productId: string, colorId: string) => {
    setSelection((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], colorId },
    }))
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const clamped = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, quantity))
    setSelection((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], quantity: clamped },
    }))
  }, [])

  const increment = useCallback(
    (productId: string) => {
      setSelection((prev) => {
        const current = prev[productId]?.quantity ?? 0
        return {
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity: Math.min(MAX_QUANTITY, current + 1),
          },
        }
      })
    },
    []
  )

  const decrement = useCallback((productId: string) => {
    setSelection((prev) => {
      const current = prev[productId]?.quantity ?? 0
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: Math.max(MIN_QUANTITY, current - 1),
        },
      }
    })
  }, [])

  /** Total number of cameras selected across all products */
  const totalQuantity = useMemo(
    () =>
      Object.values(selection).reduce((sum, item) => sum + item.quantity, 0),
    [selection]
  )

  /** Running subtotal in USD based on each product's sale price */
  const subtotal = useMemo(
    () =>
      products.reduce((sum, product) => {
        const qty = selection[product.id]?.quantity ?? 0
        return sum + qty * product.pricing.sale
      }, 0),
    [products, selection]
  )

  return {
    selection,
    selectColor,
    setQuantity,
    increment,
    decrement,
    totalQuantity,
    subtotal,
  }
}
