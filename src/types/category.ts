import { IBrand } from '.';

export interface ICategory {
  name: string;
  slug: string;
  marca: IBrand;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByAgency?: string;
  createdByAgencyName?: string;
}