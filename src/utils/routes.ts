import {
  ArtDetail,
  CadastroAgencia,
  CadastroArte,
  CadastroCampanha,
  CadastroCategoria,
  CadastroEventos,
  CadastroFornecedor,
  CadastroFotografo,
  CadastroImagens,
  CadastroLoja,
  CadastroMarca,
  CadastroProduto,
  CadastroUser,
  Dashboard,
  Error404,
  Hub,
  ImgDetail,
  ListOrders,
  Login,
  Marcas,
  OrderDetail,
  Orders,
  SearchArt,
  SearchEvent,
  SearchImages,
} from "@pages";
import { ROLES, RoutesList } from "@types";

export const routes: RoutesList[] = [
  {
    path: "/",
    component: Error404,
    isPublic: true,
    title: "Não encontrado",
    id: 1,
    visibleRole: [ROLES.all]
  },
  {
    path: "/login",
    component: Login,
    isPublic: true,
    title: "Login",
    id: 2,
    visibleRole: [ROLES.all]
  },
  {
    path: "/marcas",
    component: Marcas,
    title: "Selecione a marca",
    id: 3,
    visibleRole: [ROLES.all]
  },
  {
    path: "/cadastro-usuario/:marca",
    component: CadastroUser,
    title: "Cadastro de usuário",
    id: 4,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager]
  },
  {
    path: "/cadastro-marcas/:marca",
    component: CadastroMarca,
    title: "Cadastro de marca",
    id: 5,
    visibleMenu: true,
    visibleRole: [ROLES.admin]
  },
  {
    path: "/cadastro-lojas/:marca",
    component: CadastroLoja,
    title: "Cadastro de lojas",
    id: 6,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager]
  },
  {
    path: "/cadastro-agencia/:marca",
    component: CadastroAgencia,
    title: "Cadastro de agência",
    id: 7,
    visibleMenu: true,
    visibleRole: [ROLES.admin]
  },
  {
    path: "/home/:marca",
    component: Dashboard,
    title: "Home",
    id: 8,
    visibleRole: [ROLES.all]
  },
  {
    path: "/cadastro-campanha/:marca",
    component: CadastroCampanha,
    title: "Cadastro de campanha",
    id: 9,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerAgency]
  },
  {
    path: "/cadastro-arte/:marca",
    component: CadastroArte,
    title: "Cadastro de arte",
    id: 10,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerAgency, ROLES.userAgency]
  },
  {
    path: "/cadastro-fotografo/:marca",
    component: CadastroFotografo,
    title: "Cadastro de agência de fotografia",
    id: 11,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerAgency]
  },
  {
    path: "/cadastro-imagem/:marca",
    component: CadastroImagens,
    title: "Cadastro de Imagens",
    id: 12,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerAgency, ROLES.userAgency, ROLES.managerPhoto, ROLES.userPhoto]
  },
  {
    path: "/detalhe-imagem/:marca/:id",
    component: ImgDetail,
    title: "Detalhe da Imagem",
    id: 13,
    visibleRole: [ROLES.all]
  },
  {
    path: "/hub",
    component: Hub,
    title: "HUB",
    id: 14,
    visibleRole: [ROLES.all]
  },
  {
    path: "/busca-imagens/:marca",
    component: SearchImages,
    title: "Busca de imagens",
    id: 15,
    visibleMenu: true,
    visibleRole: [ROLES.all]
  },
  {
    path: "/cadastro-categoria/:marca",
    component: CadastroCategoria,
    title: "Cadastro categoria",
    id: 16,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager]
  },
  {
    path: "/cadastro-produto/:marca",
    component: CadastroProduto,
    title: "Cadastro produto",
    id: 17,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager]
  },
  {
    path: "/busca-artes/:marca",
    component: SearchArt,
    title: "Busca de artes",
    id: 18,
    visibleMenu: true,
    visibleRole: [ROLES.all]
  },
  {
    path: "/detalhe-arte/:marca/:id",
    component: ArtDetail,
    title: "Detalhe da Arte",
    id: 19,
    visibleRole: [ROLES.all]
  },
  {
    path: "/cadastro-evento/:marca",
    component: CadastroEventos,
    title: "Cadastro de Eventos",
    id: 20,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerAgency, ROLES.userAgency, ROLES.managerPhoto, ROLES.userPhoto]
  },
  {
    path: "/busca-evento/:marca",
    component: SearchEvent,
    title: "Busca de Eventos",
    id: 21,
    visibleMenu: true,
    visibleRole: [ROLES.all]
  },
  {
    path: "/pedido/:marca",
    component: Orders,
    isPublic: true,
    title: "Fazer pedido",
    id: 22,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerStore]
  },
  {
    path: "/pedido/:marca/lista",
    component: ListOrders,
    title: "Lista de pedidos",
    id: 23,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerStore]
  },
  {
    path: "/pedido/:marca/:id",
    component: OrderDetail,
    title: "Detalhe de pedido",
    id: 24,
    visibleMenu: false,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager, ROLES.managerStore]
  },
  {
    path: "/cadastro-fornecedor/:marca",
    component: CadastroFornecedor,
    title: "Cadastro de fornecedor",
    id: 25,
    visibleMenu: true,
    visibleRole: [ROLES.admin, ROLES.operationManager, ROLES.districtManager]
  },
];
