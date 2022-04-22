import { IAuthContext } from "@types";
import { Context, createContext, useState } from "react";

const DEFAULT_VALUE: IAuthContext = {
  user: {
    uid: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
    store: "",
    cargo: "",
    phone: ""
  },
  token: {
    accessToken: "",
    expirationTime: "",
    refreshToken: "",
    isExpired: true
  },
  agency: null,
  store: null,
  setUser: () => { },
  setToken: () => { },
  setAgency: () => { },
  setStore: () => { },
};

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>(DEFAULT_VALUE);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [token, setToken] = useState(DEFAULT_VALUE.token);
  const [agency, setAgency] = useState(DEFAULT_VALUE.agency);
  const [store, setStore] = useState(DEFAULT_VALUE.store);

  return <AuthContext.Provider value={{
    user, token, agency, store, setUser, setToken, setAgency, setStore,
  }}>
    {children}
  </AuthContext.Provider>;
};
