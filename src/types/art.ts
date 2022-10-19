import { IBrand, ICampaign, IUser } from ".";

export interface IArt {
  id: string;
  name: string;
  observation?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: IUser;
  approvedBy?: IUser | string;
  refusedBy?: IUser | string;
  type: string;
  marca: IBrand;
  marcaSlug: string;
  campaign: ICampaign;
  images: Array<IStorageImage>;
  year: string;
  format: string;
  specification: string;
  zipFile?: string;
}

export interface IStorageImage {
  url: string;
  ref: string;
}