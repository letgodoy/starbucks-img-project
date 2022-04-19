import { IUser } from './user';

export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string,
  expirationTime: string,
  refreshToken: string,
  isExpired: boolean
}

export interface IAuthContext {
  user: IUser;
  token: ITokens;
  setToken: React.Dispatch<React.SetStateAction<ITokens>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
};