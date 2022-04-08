import { Error404, Login } from "../pages";

// export interface RoutesList extends RouteProps<T, RoutePath> {}

export interface RoutesList {
  path: string;
  component: any;
}

export const routes: RoutesList[] = [
  {
    path: "/",
    component: Error404,
  },
  {
    path: "/login",
    component: Login,
  },
];
