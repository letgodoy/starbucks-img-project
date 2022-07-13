import {
  ArtDetail,
  CadastroAgencia,
  CadastroArte,
  CadastroCampanha,
  CadastroCategoria,
  CadastroFotografo,
  CadastroImagens,
  CadastroLoja,
  CadastroMarca,
  CadastroProduto,
  CadastroUser,
  Dashboard,
  Hub,
  ImgDetail,
  Login,
  Marcas,
  SearchArt,
  SearchImages,
  Error404
} from "@pages";
import { RoutesList } from "@types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BrandContext } from "../components";

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
    id: 2,
  },
  {
    path: "/marcas",
    component: Marcas,
    isPublic: true,
    title: "Selecione a marca",
    id: 3,
  },
  {
    path: "/cadastro-usuario",
    component: CadastroUser,
    isPublic: true,
    title: "Cadastro de usuário",
    id: 4,
    visibleMenu: true,
  },
  {
    path: "/cadastro-marcas",
    component: CadastroMarca,
    isPublic: true,
    title: "Cadastro de marca",
    id: 5,
    visibleMenu: true,
  },
  {
    path: "/cadastro-lojas",
    component: CadastroLoja,
    isPublic: true,
    title: "Cadastro de lojas",
    id: 6,
    visibleMenu: true,
  },
  {
    path: "/cadastro-agencia",
    component: CadastroAgencia,
    isPublic: true,
    title: "Cadastro de agência",
    id: 7,
    visibleMenu: true,
  },
  {
    path: "/home/:marca",
    component: Dashboard,
    isPublic: true,
    title: "Home",
    id: 8,
  },
  {
    path: "/cadastro-campanha/:marca",
    component: CadastroCampanha,
    isPublic: true,
    title: "Cadastro de campanha",
    id: 9,
    visibleMenu: true,
  },
  {
    path: "/cadastro-arte/:marca",
    component: CadastroArte,
    isPublic: true,
    title: "Cadastro de arte",
    id: 10,
    visibleMenu: true,
  },
  {
    path: "/cadastro-fotografo",
    component: CadastroFotografo,
    isPublic: true,
    title: "Cadastro de agência de fotografia",
    id: 11,
    visibleMenu: true,
  },
  {
    path: "/cadastro-imagem/:marca",
    component: CadastroImagens,
    isPublic: true,
    title: "Cadastro de Imagens",
    id: 12,
    visibleMenu: true,
  },
  {
    path: "/detalhe-imagem/:marca/:id",
    component: ImgDetail,
    isPublic: true,
    title: "Detalhe da Imagem",
    id: 13,
  },
  {
    path: "/hub",
    component: Hub,
    isPublic: true,
    title: "HUB",
    id: 14,
  },
  {
    path: "/busca-imagens/:marca",
    component: SearchImages,
    isPublic: true,
    title: "Busca de imagens",
    id: 15,
    visibleMenu: true,
  },
  {
    path: "/cadastro-categoria/:marca",
    component: CadastroCategoria,
    isPublic: true,
    title: "Cadastro categoria",
    id: 16,
    visibleMenu: true,
  },
  {
    path: "/cadastro-produto/:marca",
    component: CadastroProduto,
    isPublic: true,
    title: "Cadastro produto",
    id: 17,
    visibleMenu: true,
  },
  {
    path: "/busca-artes/:marca",
    component: SearchArt,
    isPublic: true,
    title: "Busca de artes",
    id: 18,
    visibleMenu: true,
  },
  {
    path: "/detalhe-arte/:marca/:id",
    component: ArtDetail,
    isPublic: true,
    title: "Detalhe da Arte",
    id: 19,
  },
];

export const verifyBrand = () => {

  const marca = useContext(BrandContext)?.selectedBrand?.slug
  const navigate = useNavigate();

  if (!marca) {
    navigate("/marcas")
  }
}