import { IUser } from ".";
import { IAddress } from "./address";

export interface IProvider {
  slug: string;
  name: string;
  cnpj: string;
  address: IAddress;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  productionEmail: string;
  createdAt: string;
  createdBy: IUser;
  lastUpdated: string;
}
