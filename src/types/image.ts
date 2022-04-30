import { IStorageImage } from ".";

export interface IImage {
  name: string;
  description?: string;
  year?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: string;
  approvedBy?: string;
  product?: string;
  marca: string;
  mainImg: IStorageImage;
}