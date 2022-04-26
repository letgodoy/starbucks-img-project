import {
  CadastroAgencia,
  CadastroCampanha,
  CadastroLoja,
  CadastroMarca,
  CadastroPeca,
  CadastroUser,
  Dashboard,
  Error404,
  Login,
  Marcas,
} from "@pages";
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
    path: "/marcas",
    component: Marcas,
    isPublic: true,
  },
  {
    path: "/cadastrousuario",
    component: CadastroUser,
    isPublic: true,
  },
  {
    path: "/cadastromarcas",
    component: CadastroMarca,
    isPublic: true,
  },
  {
    path: "/cadastrolojas",
    component: CadastroLoja,
    isPublic: true,
  },
  {
    path: "/cadastroagencia",
    component: CadastroAgencia,
    isPublic: true,
  },
  {
    path: "/home/:marca",
    component: Dashboard,
    isPublic: true,
  },
  {
    path: "/cadastrocampanha/:marca",
    component: CadastroCampanha,
    isPublic: true,
  },
  {
    path: "/cadastropeca/:marca/:campanha",
    component: CadastroPeca,
    isPublic: true,
  },
];
