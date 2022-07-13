import { routes } from '@utils';
import { ReactElement } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
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
  return <Routes>
    <Route path="/" element={<Error404 />} />
    <Route path="/login" element={<Login />} />
    <Route path="/marcas" element={<Marcas />} />
    <Route path="/cadastro-usuario" element={<CadastroUser />} />
    <Route path="/cadastro-marcas" element={<CadastroMarca />} />
    <Route path="/cadastro-lojas" element={<CadastroLoja />} />
    <Route path="/cadastro-agencia" element={<CadastroAgencia />} />
    <Route path="/home/:marca" element={<Dashboard params={{
      marca: ''
    }} />} />
    <Route path="/cadastro-campanha/:marca" element={<CadastroCampanha params={{
      marca: ''
    }} />} />
    <Route path="/cadastro-arte/:marca" element={<CadastroArte params={{
      marca: ''
    }} />} />
    <Route path="/cadastro-fotografo" element={<CadastroFotografo />} />
    <Route path="/cadastro-imagem/:marca" element={<CadastroImagens params={{
      marca: ''
    }} />} />
    <Route path="/detalhe-imagem/:marca/:id" element={<ImgDetail params={{
      id: ''
    }} />} />
    <Route path="/hub" element={<Hub />} />
    <Route path="/busca-imagens/:marca" element={<SearchImages params={{
      marca: ''
    }} />} />
    <Route path="/cadastro-categoria/:marca" element={<CadastroCategoria params={{
      marca: ''
    }} />} />
    <Route path="/cadastro-produto/:marca" element={<CadastroProduto params={{
      marca: ''
    }} />} />
    <Route path="/busca-artes/:marca" element={<SearchArt params={{
      marca: ''
    }} />} />
    <Route path="/detalhe-arte/:marca/:id" element={<ArtDetail params={{
      id: ''
    }} />} />
  </Routes>
}

