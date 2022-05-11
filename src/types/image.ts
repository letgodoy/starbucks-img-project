import { IBrand, ICampaign, IStorageImage } from ".";

export interface IImage {
  id: string;
  name: string;
  description?: string;
  format?: string;
  validate?: string;
  sku?: string;
  year?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: string;
  approvedBy?: string;
  product?: string;
  marca: IBrand;
  mainImg: IStorageImage;
  campaign: ICampaign;
}

export interface IFile {
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  file: Blob;
}

export interface IFileStorage {
  fileName: string;
  metadata: {
    contentType: string;
    customMetadata: {
      lastModified: string;
      name: string;
      size: string;
    };
    fullPath: string;
    name: string;
    size: number;
    timeCreated: string;
    type: string;
    updated: string;
  };
  state: string;
  totalBytes: number;
  url: string;
}
