import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from "./auth";
import { RouterContext } from "./router";
import { theme } from "./theme";

export { AuthContext } from "./auth";

const queryClient = new QueryClient();

export const AllUniversalContext: FC = ({ children }: any) => {
  return <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <RouterContext />
      </AuthContextProvider>
    </ThemeProvider>
  </QueryClientProvider>
}