import { IPhotographer, IStore } from '@types';
import { Dispatch, SetStateAction } from 'react';
import { IAgency } from './agency';
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
  agency: IAgency | null;
  store: IStore | null;
  photographer: IPhotographer | null;
  setToken: Dispatch<SetStateAction<ITokens>>;
  setUser: Dispatch<SetStateAction<IUser>>;
  setAgency: Dispatch<SetStateAction<IAgency | null>>;
  setStore: Dispatch<SetStateAction<IStore | null>>;
  setPhotographer: Dispatch<SetStateAction<IPhotographer | null>>;
};


export enum ROLES {
  all = "all",
  admin = "admin",
  operationManager = "operationManager",
  districtManager = "districtManager",
  managerStore = "managerStore",
  managerAgency = "managerAgency",
  userAgency = "userAgency",
  managerPhoto = "managerPhoto",
  userPhoto = "userPhoto",
}