import { requireAuth } from '@dataAccess';
import { routes } from '@utils';
import { ReactElement } from 'react';
import { Route, RouteProps, Router, Switch } from 'wouter';

const getRouters = (): ReactElement<RouteProps>[] => {

  const elements = routes.map((route): ReactElement<RouteProps> => <Route key={route.path} path={route.path} component={requireAuth(route)} />)

  return elements
}

export const RouterContext = () => {
  return <Switch>
    {getRouters()}
  </Switch>
}

