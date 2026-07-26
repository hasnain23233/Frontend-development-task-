import { createContext } from 'react'
import type {
 PlanOption,
 Product,
 SelectionMap,
 ProductCategory,
 ReviewLineItem,
} from './../types/product.types'

export interface BundleContextType {
 name: string
 products: Product[]
 plans: PlanOption[]
 selectedPlanId: string
 selection: SelectionMap
 activeVariantByProduct: Record<string, string>
 setActiveVariant: (productId: string, variantId: string) => void
 increment: (productId: string, variantId: string) => void
 decrement: (productId: string, variantId: string) => void
 selectPlan: (planId: string) => void
 saveBundle: () => void
 saved: boolean
 selectedLineItems: ReviewLineItem[]
 selectedCounts: Record<ProductCategory | 'plan', number>
 subtotal: number
 selectedPlan: PlanOption
 shippingCost: number
 total: number
 originalTotal: number
 savings: number
}

export const BundleContext = createContext<BundleContextType | null>(null);