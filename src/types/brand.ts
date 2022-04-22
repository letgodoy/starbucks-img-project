import { ICampaign } from "./campaign";

export interface IBrand {
  name: string;
  avatar?: string;
  campaigns?: Array<ICampaign>;
};