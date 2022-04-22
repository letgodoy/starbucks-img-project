import { IPiece } from "./piece";

export interface ICampaign {
  name: string;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByAgency?: string;
  createdByAgencyName?: string;
  items?: Array<IPiece>;
}

export interface ICreateCampaign extends ICampaign {
  marca: string;
}