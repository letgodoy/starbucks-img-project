import {
  CadastroAgencia,
  CadastroCampanha,
  CadastroFotografo,
  CadastroImagens,
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
    title: "Não encontrado",
    id: 1,
  },
  {
    path: "/login",
    component: Login,
    isPublic: true,
    title: "Login",
    id: 2
  },
  {
    path: "/marcas",
    component: Marcas,
    isPublic: true,
    title: "Selecione a marca",
    id: 3,
    visibleMenu: true
  },
  {
    path: "/cadastrousuario",
    component: CadastroUser,
    isPublic: true,
    title: "Cadastro de usuário",
    id: 4,
    visibleMenu: true
  },
  {
    path: "/cadastromarcas",
    component: CadastroMarca,
    isPublic: true,
    title: "Cadastro de marca",
    id: 5,
    visibleMenu: true
  },
  {
    path: "/cadastrolojas",
    component: CadastroLoja,
    isPublic: true,
    title: "Cadastro de lojas",
    id: 6,
    visibleMenu: true
  },
  {
    path: "/cadastroagencia",
    component: CadastroAgencia,
    isPublic: true,
    title: "Cadastro de agência",
    id: 7,
    visibleMenu: true
  },
  {
    path: "/home/:marca",
    component: Dashboard,
    isPublic: true,
    title: "Home",
    id: 8,
  },
  {
    path: "/cadastrocampanha/:marca",
    component: CadastroCampanha,
    isPublic: true,
    title: "Cadastro de campanha",
    id: 9,
    visibleMenu: true
  },
  {
    path: "/cadastropeca/:marca/:campanha",
    component: CadastroPeca,
    isPublic: true,
    title: "Cadastro de peças",
    id: 10,
    visibleMenu: true
  },
  {
    path: "/cadastrofotografo",
    component: CadastroFotografo,
    isPublic: true,
    title: "Cadastro de agência de fotografia",
    id: 11,
    visibleMenu: true
  },
  {
    path: "/cadastroimagem/:marca",
    component: CadastroImagens,
    isPublic: true,
    title: "Cadastro de Imagens",
    id: 12,
    visibleMenu: true
  },
];
