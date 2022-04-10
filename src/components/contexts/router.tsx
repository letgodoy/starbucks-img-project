import { routes } from '@utils';
import { ReactElement } from 'react';
import { Route, RouteProps, Router, Switch, useLocation } from 'wouter';

const RequireAuth = ({ children }: any) => {
  // let auth = useAuth(); //aqui pega a funcao do context pra ver se ta logado
  const [location, setLocation] = useLocation();

  // if (!auth.user) {

  // setLocation("/login")
  // }

  return children;
}

const getRouters = (): ReactElement<RouteProps>[] => {

  const elements = routes.map(({ path, component, isPublic }): ReactElement<RouteProps> => <Route key={path} path={path} component={isPublic ? component : <RequireAuth>{component}</RequireAuth>} />)

  return elements
}

export const RouterContext = () => {
  return <Router>
    {getRouters()}
  </Router>
}

