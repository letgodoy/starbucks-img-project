import { IAgency, ICredentials, IPhotographer, IStore, ROLES } from ".";

export interface ICreateUser extends ICredentials, Omit<IUser, "uid"> {
  password: string;
}

export interface IUser {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  role: ROLES;
  store?: IStore | null;
  phone: string;
  cargo: string;
  agency?: IAgency | null;
  createdAt: string;
  createdBy: IUser | null;
  lastUpdated: string;
  photographer?: IPhotographer | null;
}
