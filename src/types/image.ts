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

export interface IFile {
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  size: 18213;
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
