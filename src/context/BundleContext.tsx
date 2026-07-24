import { createContext } from "react";
import type { Product , SelectionMap  } from "./../types/product.types";

export interface PlanInfo {
  name: string
  originalPrice: number
  salePrice: number
}

export interface BundleContextType {
  name: string;
  products: Product[];
  selection: SelectionMap;
  selectColor: (productId: string, colorId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  totalQuantity: number;
  subtotal: number;
  plan: PlanInfo;
  shippingCost: number;
}

export const BundleContext = createContext<BundleContextType | null>(null);