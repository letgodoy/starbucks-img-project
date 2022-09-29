import { IBrand, IBrandContext } from "@types";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBrandByID } from "../../dataAccess";

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

export const checkBrand = () => {
  const { selectedBrand: marca, setBrand } = useContext(BrandContext)
  const params = useParams();
  const { mutateAsync, data } = useGetBrandByID()

  if (!marca && params.marca) {
    mutateAsync(params.marca)
  }

  useEffect(() => {
    if (data) {
      setBrand(data as IBrand)
    }
  },[data])
}