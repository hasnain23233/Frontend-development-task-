import { createContext } from "react";

export interface BundleContextType {
  name: string;
}

export const BundleContext = createContext<BundleContextType | null>(null);