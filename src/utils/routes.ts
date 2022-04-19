import { Brand, CadastroUser, Error404, Login } from "@pages";
import { RoutesList } from "@types";

export const routes: RoutesList[] = [
  {
    path: "/",
    component: Error404,
    isPublic: true,
  },
  {
    path: "/login",
    component: Login,
    isPublic: true,
  },
  {
    path: "/brand",
    component: Brand,
  },
  {
    path: "/cadastrousuario",
    component: CadastroUser,
    isPublic: true,
  },
];
