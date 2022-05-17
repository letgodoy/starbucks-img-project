import { Dispatch, SetStateAction } from "react";
import { IUser } from "./user";

export interface IBrand {
  slug: string;
  name: string;
  avatar?: string;
  hero?: string;
  createdAt: string;
  createdBy: IUser;
  lastUpdated: string;
}

export interface IBrandContext {
  selectedBrand: null | IBrand; 
  setBrand: Dispatch<SetStateAction<null | IBrand>>;
}
