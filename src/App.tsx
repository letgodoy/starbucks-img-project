import Container from '@mui/material/Container';
import { routes } from '@utils';
import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, RouteProps, Switch as SwitchRouter } from 'wouter';

const queryClient = new QueryClient();

const getRouters = (): Array<ReactElement<RouteProps>> => {
  const elements = routes.map((route): ReactElement<RouteProps> => <Route key={route.path} path={route.path} component={route.component} />)

  return elements
}

export default function App() {
  return (
    <Container maxWidth="lg">
      <QueryClientProvider client={queryClient}>
        <SwitchRouter>
          {getRouters()}
        </SwitchRouter>
      </QueryClientProvider>
    </Container>
  );
}
