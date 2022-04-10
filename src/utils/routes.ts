import { FC, ReactElement, ReactNode } from 'react';
import { Error404, Login } from "../pages";

export interface RoutesList {
  path: string;
  component: any;
  isPublic?: boolean;
}

export const routes: RoutesList[] = [
  {
    path: "/",
    component: Error404,
    isPublic: true
  },
  {
    path: "/login",
    component: Login,
    isPublic: true
  },
];
