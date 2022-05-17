import { IBrand, IUser } from '.';

export interface ICategory {
  name: string;
  slug: string;
  marca: IBrand;
  createdAt: string;
  createdBy: IUser;
}