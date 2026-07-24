import type { ReactNode } from "react";
import { BundleContext } from "./BundleContext";
import productData from './../data/product.json'
import type { ProductsData } from './../types/product.types' 

interface BundleProviderProps {
  children: ReactNode;
}

export const BundleProvider = ({ children }: BundleProviderProps) => {
const { products } = productData as ProductsData
  const data = {
    name: "John Doe",
    products,
  };
  

  return (
    <BundleContext.Provider value={data}>
      {children}
    </BundleContext.Provider>
  );
};