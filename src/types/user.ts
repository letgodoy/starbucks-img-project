import { ICredentials } from ".";

export interface ICreateUser extends ICredentials, Omit<IUser, "uid"> {
  password: string;
}

export interface IUser {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  store?: string | null;
  phone: string;
  cargo: string;
  agency?: string | null;
  createAt: string;
  createBy: string;
  lastUpdated: string;
  photographer?: string | null;
};