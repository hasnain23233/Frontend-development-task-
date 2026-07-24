/**
 * Domain types for the "Choose your cameras" product selection step.
 * Kept separate from components so they can be reused by API layers,
 * hooks, and tests without pulling in any React code.
 */
export type ProductCategory = 'camera' | 'sensor' | 'accessory'

export interface ProductColor {
  id: string
  name: string
  /** Hex value used to render the swatch dot */
  swatchColor: string
}

export interface ProductPricing {
  /** Pre-discount price. `null` when the product has no strike-through price */
  original: number | null
  /** Current/selling price */
  sale: number
}

export interface Product {
  id: string
  name: string
  /** e.g. "Save 22%" — `null` when no badge should render */
  badge: string | null
  description: string
  learnMoreUrl: string
  image: string
  colors: ProductColor[]
  defaultColorId: string | null
  defaultQuantity: number
  pricing: ProductPricing
  category: ProductCategory      
  isRequired?: boolean  
}

export interface ProductsData {
  products: Product[]
}

/** Per-product UI selection state, keyed by product id at the hook level */
export interface ProductSelection {
  colorId: string | null
  quantity: number
}

export type SelectionMap = Record<string, ProductSelection>
