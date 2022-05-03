import { IAlertContext } from "@types";
import { Context, createContext, useState } from "react";

const DEFAULT_VALUE: IAlertContext = {
  openSuccess: false,
  openError: false,
  openWarning: false,
  openInfo: false,
  setOpenSuccess: () => { },
  setOpenError: () => { },
  setOpenWarning: () => { },
  setOpenInfo: () => { },
};

export const AlertContext: Context<IAlertContext> = createContext<IAlertContext>(DEFAULT_VALUE);

export const AlertContextProvider = ({ children }: any) => {
  const [openSuccess, setOpenSuccess] = useState(DEFAULT_VALUE.openSuccess);
  const [openError, setOpenError] = useState(DEFAULT_VALUE.openError);
  const [openWarning, setOpenWarning] = useState(DEFAULT_VALUE.openWarning);
  const [openInfo, setOpenInfo] = useState(DEFAULT_VALUE.openInfo);

  return <AlertContext.Provider value={{
    openSuccess, setOpenSuccess, openError, setOpenError, openWarning, setOpenWarning, openInfo, setOpenInfo
  }}>
    {children}
  </AlertContext.Provider>;
};
