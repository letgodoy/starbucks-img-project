import { IAuthContext } from "@types";
import { Context, createContext, FC, useState } from "react";

const DEFAULT_VALUE: IAuthContext = {
  state: {
    name: "",
    lastName: "",
    email: "",
    avatar: "",
    role: "",
    store: "",
  },
  token: "",
  setState: () => { },
  setToken: () => { },
};

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>(DEFAULT_VALUE);

export const AuthContextProvider: FC = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  const [token, setToken] = useState(DEFAULT_VALUE.token);

  return <AuthContext.Provider value={{
    state, token, setState, setToken
  }}>
    {children}
  </AuthContext.Provider>;
};
