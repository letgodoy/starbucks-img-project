import { routes } from '@utils';
import { ReactElement } from 'react';
import { Route, RouteProps, Routes, useLocation } from 'react-router-dom';
import { ArtDetail, CadastroAgencia, CadastroArte, CadastroCampanha, CadastroCategoria, CadastroFotografo, CadastroImagens, CadastroLoja, CadastroMarca, CadastroProduto, CadastroUser, Dashboard, Error404, Hub, ImgDetail, Login, Marcas, SearchArt, SearchImages } from '../../pages';

const getRouters = (): ReactElement<RouteProps>[] => {

  const elements = routes.map((route): ReactElement<RouteProps> => {

    // const authContext = useContext(AuthContext);

    // if (
    //   location === "/login" &&
    //   authContext.token.accessToken &&
    //   !authContext.token.isExpired &&
    //   authContext.user.role !== ""
    // ) {
    //   navigate("/marcas");
    // }

    // if (route.isPublic === false && authContext.token.accessToken === "") {
    //   navigate("/login");
    // }

    // if (route.isPublic) {
    //   return <Route key={route.path} path={route.path} element={route.component} />;
    // }

    // if (
    //   authContext.token.accessToken &&
    //   !authContext.token.isExpired
    //   // authContext.user.role !== ""
    // ) {
    //   return <Route key={route.path} path={route.path} element={route.component} />;
    // }

    return <Route key={route.path} path={route.path} element={route.component} />
  })

  return elements
}

export const RouterContext = () => {

  const { pathname: location } = useLocation();

  return <Routes>
    <Route path="/" element={<Error404 />} />
    <Route path="/login" element={<Login />} />
    <Route path="/marcas" element={<Marcas />} />
    <Route path="/cadastro-usuario" element={<CadastroUser />} />
    <Route path="/cadastro-marcas" element={<CadastroMarca />} />
    <Route path="/cadastro-lojas" element={<CadastroLoja />} />
    <Route path="/cadastro-agencia" element={<CadastroAgencia />} />
    <Route path="/home/:marca" element={<Dashboard />} />
    <Route path="/cadastro-campanha/:marca" element={<CadastroCampanha />} />
    <Route path="/cadastro-arte/:marca" element={<CadastroArte />} />
    <Route path="/cadastro-fotografo" element={<CadastroFotografo />} />
    <Route path="/cadastro-imagem/:marca" element={<CadastroImagens />} />
    <Route path="/detalhe-imagem/:marca/:id" element={<ImgDetail />} />
    <Route path="/hub" element={<Hub />} />
    <Route path="/busca-imagens/:marca" element={<SearchImages />} />
    <Route path="/cadastro-categoria/:marca" element={<CadastroCategoria />} />
    <Route path="/cadastro-produto/:marca" element={<CadastroProduto />} />
    <Route path="/busca-artes/:marca" element={<SearchArt />} />
    <Route path="/detalhe-arte/:marca/:id" element={<ArtDetail />} />
  </Routes>
}

