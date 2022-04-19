import { IAuthContext } from "@types";
import { Context, createContext, FC, useState } from "react";

const DEFAULT_VALUE: IAuthContext = {
  user: {
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
  setUser: () => { },
  setToken: () => { },
};

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>(DEFAULT_VALUE);

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [token, setToken] = useState(DEFAULT_VALUE.token);

  return <AuthContext.Provider value={{
    user, token, setUser, setToken
  }}>
    {children}
  </AuthContext.Provider>;
};
