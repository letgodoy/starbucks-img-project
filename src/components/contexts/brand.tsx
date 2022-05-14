import { IBrandContext } from "@types";
import { Context, createContext, useState } from "react";

const DEFAULT_VALUE: IBrandContext = {
  selectedBrand: null,
  setBrand: () => { },
};

export const BrandContext: Context<IBrandContext> = createContext<IBrandContext>(DEFAULT_VALUE);

export const BrandContextProvider = ({ children }: any) => {
  const [selectedBrand, setBrand] = useState(DEFAULT_VALUE.selectedBrand);

  return <BrandContext.Provider value={{
    selectedBrand, setBrand
  }}>
    {children}
  </BrandContext.Provider>;
};
