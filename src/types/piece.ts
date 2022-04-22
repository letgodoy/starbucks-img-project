export interface IPiece {
  name: string;
  description?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: string;
  approvedBy?: string;
  type: string;
  marca: string;
  campaign: string;
  mainImg: string;
  images: Array<string>;
}