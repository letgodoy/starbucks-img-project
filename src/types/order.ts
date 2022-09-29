import { IArt, IBrand, IStore, IUser } from ".";

export interface IOrder {
  id: string;
  arts: Array<IOrderArt>;
  createdAt: string;
  createdBy: IUser;
  approvedBy?: IUser | string;
  refusedBy?: IUser | string;
  store: IStore;
  marca: IBrand;
  marcaSlug: string;
  isClosed: boolean;
}

export interface IOrderArt {
  art: IArt;
  qnt: number;
  observation?: string;
}