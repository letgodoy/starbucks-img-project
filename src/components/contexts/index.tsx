import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertContextProvider } from "./alerts";
import { AuthContextProvider } from "./auth";
import { BrandContextProvider } from "./brand";
import { RouterContext } from "./router";
import { theme } from "./theme";

export { AlertContext } from "./alerts";
export { AuthContext } from "./auth";
export { BrandContext, checkBrand } from "./brand";

const queryClient = new QueryClient();

export const AllUniversalContext: FC = ({ children }: any) => {
  return <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <AlertContextProvider>
          <BrandContextProvider>
            <RouterContext />
          </BrandContextProvider>
        </AlertContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </QueryClientProvider>
}