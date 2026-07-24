import type { ReactNode } from "react";
import { BundleContext, type BundleContextType } from "./BundleContext";
import productData from "./../data/product.json";
import type { ProductsData } from "./../types/product.types";
import { useProductSelection } from "./../hooks/useProductSelection";

interface BundleProviderProps {
  children: ReactNode;
}

export const BundleProvider = ({ children }: BundleProviderProps) => {
  const { products } = productData as ProductsData;
  const { selection, selectColor, increment, decrement, totalQuantity, subtotal } =
    useProductSelection(products);

  const data: BundleContextType = {
    name: "John Doe",
    products,
    selection,
    selectColor,
    increment,
    decrement,
    totalQuantity,
    subtotal,
    plan: { name: "Cam Unlimited", originalPrice: 12.99, salePrice: 9.99 },
  shippingCost: 5.99,
  };

  return (
    <BundleContext.Provider value={data}>{children}</BundleContext.Provider>
  );
};