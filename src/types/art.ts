import { IBrand, ICampaign, IUser } from ".";

export interface IArt {
  name: string;
  observation?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: IUser;
  approvedBy?: IUser;
  type: string;
  marca: IBrand;
  campaign: ICampaign;
  mainImg: IStorageImage;
  images: Array<IStorageImage>;
  year: string;
  format: string;
  especification: string;
}

export interface IStorageImage {
  url: string;
  ref: string;
}