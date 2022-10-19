import { IBrand, IStorageImage, IUser } from ".";

export interface IEvent {
  id: string;
  name: string;
  description?: string;
  year: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: IUser;
  approvedBy?: IUser | string;
  refusedBy?: IUser | string;
  marca: IBrand;
  marcaSlug: string;
  cover?: IStorageImage;
  images: Array<IStorageImage>;
  zipFile?: string;
}