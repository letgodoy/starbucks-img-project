import { Dispatch, SetStateAction } from "react";

export interface IAlertContext {
  openSuccess: boolean | string;
  openError: boolean | string;
  openWarning: boolean | string;
  openInfo: boolean | string;
  setOpenSuccess: Dispatch<SetStateAction<boolean | string>>;
  setOpenError: Dispatch<SetStateAction<boolean | string>>;
  setOpenWarning: Dispatch<SetStateAction<boolean | string>>;
  setOpenInfo: Dispatch<SetStateAction<boolean | string>>;
};