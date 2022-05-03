import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertContextProvider } from "./alerts";
import { AuthContextProvider } from "./auth";
import { RouterContext } from "./router";
import { theme } from "./theme";

export { AuthContext } from "./auth";
export { AlertContext } from "./alerts";

const queryClient = new QueryClient();

export const AllUniversalContext: FC = ({ children }: any) => {
  return <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <AlertContextProvider>
          <RouterContext />
        </AlertContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </QueryClientProvider>
}