import { IBrand, IUser } from '.';

export interface ICategory {
  name: string;
  slug: string;
  marca: IBrand;
  marcaSlug: string;
  createdAt: string;
  createdBy: IUser;
}