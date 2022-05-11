import { IAddress } from "./address";

export interface IPhotographer {
  slug: string;
  name: string;
  cnpj: string;
  address: IAddress;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
}
