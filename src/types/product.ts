import { IAgency, IBrand, IUser } from '.';

export interface IProduct {
  name: string;
  slug: string;
  marca: IBrand;
  createdAt: string;
  createdBy: IUser;
  createdByAgency?: IAgency;
}
