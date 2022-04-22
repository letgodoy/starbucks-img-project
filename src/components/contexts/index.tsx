import { FC } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from "./auth";
import { RouterContext } from "./router";

export { AuthContext } from "./auth";

const queryClient = new QueryClient();

export const AllUniversalContext: FC = ({ children }: any) => {
  return <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterContext />
    </AuthContextProvider>
  </QueryClientProvider>
}