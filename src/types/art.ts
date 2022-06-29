import { IBrand, ICampaign, IUser } from ".";

export interface IArt {
  id: string;
  name: string;
  observation?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: IUser;
  approvedBy?: IUser;
  type: string;
  marca: IBrand;
  marcaSlug: string;
  campaign: ICampaign;
  images: Array<IStorageImage>;
  year: string;
  format: string;
  specification: string;
  
}

export interface IStorageImage {
  url: string;
  ref: string;
}