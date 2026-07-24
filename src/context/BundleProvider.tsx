import type { ReactNode } from "react";
import { BundleContext } from "./BundleContext";

interface BundleProviderProps {
  children: ReactNode;
}

export const BundleProvider = ({ children }: BundleProviderProps) => {
  const data = {
    name: "John Doe",
  };

  return (
    <BundleContext.Provider value={data}>
      {children}
    </BundleContext.Provider>
  );
};