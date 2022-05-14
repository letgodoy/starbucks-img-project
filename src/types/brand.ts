import { Dispatch, SetStateAction } from "react";

export interface IBrand {
  slug: string;
  name: string;
  avatar?: string;
  hero?: string;
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
}

export interface IBrandContext {
  selectedBrand: null | IBrand; 
  setBrand: Dispatch<SetStateAction<null | IBrand>>;
}
