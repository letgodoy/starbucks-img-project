import { IUser } from ".";

export interface IArt {
  name: string;
  description?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: IUser;
  approvedBy?: string;
  type: string;
  marca: string;
  campaign: string;
  mainImg: IStorageImage;
  images: Array<IStorageImage>;
  year?: string;
}

export interface IStorageImage {
  url: string;
  ref: string;
}