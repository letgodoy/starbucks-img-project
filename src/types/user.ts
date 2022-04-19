import { ICredentials } from ".";

export interface ICreateUser extends ICredentials, IUser {
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  role: string;
  store: string;
  phone: string;
  cargo: string;
};