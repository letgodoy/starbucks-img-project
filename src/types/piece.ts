export interface IPiece {
  name: string;
  description?: string;
  tags?: Array<string>;
  createdAt: string;
  createdBy: string;
  approvedBy?: string;
  type: string;
}

export interface ICreatePiece extends IPiece {
  marca: string;
  campaign: string;
}