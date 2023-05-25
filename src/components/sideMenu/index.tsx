import LogoDark from "@assets/southrock_preto_1_icon.png";
import { BrandContext } from "@components";
import { Box, Button, Typography } from "@elements";
import { Collapse, Divider, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { menuCategory, routes } from "@utils";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateUserRoles } from "../../utils/validateUserRoles";
import { useAuth } from "../contexts/auth";
import { RoutesList } from "../../types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const SideMenu = () => {
  const { user } = useAuth();
  const { selectedBrand } = useContext(BrandContext)
  const [openMenu, setOpenMenu] = useState<null | menuCategory>(null);
  const { marca: marcaURI } = useParams()

  const marca = selectedBrand?.slug || marcaURI || "";

  const darkMode = true

  const [selectedIndex, setSelectedIndex] = useState(1);

  const navigate = useNavigate();

  if (!marca || marca === "") navigate("/")

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    path: string,
  ) => {
    setSelectedIndex(index);
    navigate(path)
  };

  const handleCollapse = (category: menuCategory) => {

    if (openMenu != null) setOpenMenu(null)

    if (openMenu === null) setOpenMenu(category);
  };

  const ListItem = (route?: RoutesList, sub?: boolean) => {

    if (!route || !route.path) return null

    const { path, title, id, roles } = route

    const redirect = path.replace(":marca", marca)

    if (!validateUserRoles({ roles, currentUser: user })) return null;

    return <ListItemButton
      key={id}
      selected={selectedIndex === id}
      onClick={(event) => handleListItemClick(event, id, redirect)}
      sx={sub ? { pl: 4 } : undefined}
    >
      {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
      <ListItemText primary={title} />
    </ListItemButton>
  }

  const renderRoutes = () => {
    const visibleRoutes = routes.filter(o => o.visibleMenu)

    let allCategories: Set<menuCategory> = new Set()
    visibleRoutes.map(route => allCategories.add(route.category as menuCategory))
    const visibleCategories: menuCategory[] = Array.from(allCategories);

    const routesWOCat: RoutesList[] = visibleRoutes.filter(o => !o.category)

    const menuList: Array<menuCategory | RoutesList> = visibleCategories.concat(routesWOCat as any)

    return menuList.map((route, i) => {

      if (typeof route === 'string') {

        const categoryRoutes = visibleRoutes.filter(o => o.category === route)

        return <>
          <ListItemButton key={i} selected={selectedIndex === i} onClick={() => handleCollapse(route as menuCategory)}>
            <ListItemText primary={route} />
            {openMenu === route ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse key={i+30} in={openMenu === route} timeout="auto" unmountOnExit>
            <List component="div">
              {categoryRoutes.map(route => ListItem(route, true))}
            </List>
          </Collapse></>
      }

      if (route && typeof route === 'object' && route.path) {
        return ListItem(route)
      }

      return null
    })
  };


  return <Paper elevation={3} sx={{ color: "white", height: "100%", margin: 2, borderRadius: 2, padding: 2, background: "linear-gradient(142deg, #0a0a0a 0%, #202020 100%)", overflow: 'auto' }}>
    <Box display="flex" alignItems="center" justifyContent={"center"} gap={1} >
      <Box component="img" src={LogoDark} alt="Southrock HUB" width="2rem" />
      <Typography component="h6" fontWeight="medium">
        Southrock HUB
      </Typography>
    </Box>
    <Button href={`/home/${marca}`} sx={{ marginY: 2, paddingY: 1 }} fullWidth>
      Home {marca}
    </Button>
    <Divider
      light={!!darkMode}
    />
    <List component="nav" aria-label="main mailbox folders">
      {renderRoutes()}
    </List>
  </Paper>
}
