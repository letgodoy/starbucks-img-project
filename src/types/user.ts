import { ICredentials } from ".";

export interface ICreateUser extends ICredentials, IUser {
  password: string;
}

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  store: string;
};