import { IBrand, IUser } from ".";
import { IAddress } from "./address";

export interface IStore {
  slug: string;
  name: string;
  cnpj: string;
  address: IAddress;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  createdAt: string;
  createdBy: IUser;
  lastUpdated: string;
  marca?: IBrand;
  marcaSlug?: string;
}
