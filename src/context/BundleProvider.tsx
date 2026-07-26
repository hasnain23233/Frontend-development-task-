import type { ReactNode } from 'react'
import { BundleContext, type BundleContextType } from './BundleContext'
import productData from './../data/product.json'
import type { BundleData } from './../types/product.types'
import { useProductSelection } from './../hooks/useProductSelection'

interface BundleProviderProps {
  children: ReactNode
}

export const BundleProvider = ({ children }: BundleProviderProps) => {
  const { products, plans } = productData as BundleData
  const {
    selection,
    activeVariantByProduct,
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
    selectedPlan,
    shippingCost,
    total,
    originalTotal,
    savings,
  } = useProductSelection(products, plans)

  const data: BundleContextType = {
    name: 'John Doe',
    products,
    plans,
    selectedPlanId,
    selection,
    activeVariantByProduct,
    setActiveVariant,
    increment,
    decrement,
    selectPlan,
    saveBundle,
    saved,
    selectedLineItems,
    selectedCounts,
    subtotal,
    selectedPlan,
    shippingCost,
    total,
    originalTotal,
    savings,
  }

  return <BundleContext.Provider value={data}>{children}</BundleContext.Provider>
}
