import { IAgency, IBrand, IPhotographer, IUser } from ".";

export interface ICampaign {
  name: string;
  slug: string;
  year: string;
  marca: IBrand;
  createdAt: string;
  createdBy: IUser;
  createdByAgency?: IAgency | IPhotographer | string;
}
