import { useContext } from "react";
import { BundleContext } from "./BundleContext";

export const useBundle = () => {
  const context = useContext(BundleContext);

  if (!context) {
    throw new Error("useBundle must be used inside BundleProvider");
  }

  return context;
};