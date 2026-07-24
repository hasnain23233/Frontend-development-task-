import { createContext } from "react";
import type { Product } from "./../types/product.types";

export interface BundleContextType {
  name: string;
  products: Product[];
}

export const BundleContext = createContext<BundleContextType | null>(null);