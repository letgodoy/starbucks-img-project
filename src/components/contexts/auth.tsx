import { IAuthContext } from "@types";
import { Context, createContext, useState } from "react";

const DEFAULT_VALUE: IAuthContext = {
  user: {
    uid: "aaaa",
    name: "tewste",
    email: "teste@teste",
    avatar: "",
    role: "admin test",
    store: null,
    cargo: "aaa",
    phone: "3333",
    createdAt: "123",
    createdBy: null,
    lastUpdated: "123",
    photographer: null,
    agency: null
  },
  token: {
    accessToken: "",
    expirationTime: "",
    refreshToken: "",
    isExpired: true
  },
  agency: null,
  store: null,
  photographer: null,
  setUser: () => { },
  setToken: () => { },
  setAgency: () => { },
  setStore: () => { },
  setPhotographer: () => { },
};

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>(DEFAULT_VALUE);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [token, setToken] = useState(DEFAULT_VALUE.token);
  const [agency, setAgency] = useState(DEFAULT_VALUE.agency);
  const [store, setStore] = useState(DEFAULT_VALUE.store);
  const [photographer, setPhotographer] = useState(DEFAULT_VALUE.photographer);

  return <AuthContext.Provider value={{
    user, token, agency, store, photographer, setUser, setToken, setAgency, setStore, setPhotographer
  }}>
    {children}
  </AuthContext.Provider>;
};
