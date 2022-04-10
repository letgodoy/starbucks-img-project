import { IUser } from './user';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuthContext {
  state: IUser;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<IUser>>;
};