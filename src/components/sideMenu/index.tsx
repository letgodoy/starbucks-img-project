import LogoDark from "@assets/southrock_preto_1_icon.png";
import { AuthContext } from "@components";
import { Box, Button, Typography } from "@elements";
import { Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { routes } from "@utils";
import React, { FC, PropsWithChildren, useContext, useState } from "react";
import { useLocation } from "wouter";

export const SideMenu = ({ params }: { params?: { marca: string, campanha: string } }) => {

  const { marca, campanha } = params || {marca: "", campanha: ""}

  const darkMode = true

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [location, setLocation] = useLocation()

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    path: string,
  ) => {
    setSelectedIndex(index);
    setLocation(path)
  };

  const renderRoutes = routes.map(({ path, title, id, visibleMenu }) => {

    if (!visibleMenu) return null

    let redirect = path
    redirect = path.match(":marca") ? path.replace(":marca", marca) : redirect
    redirect = path.match(":campanha") ? path.replace(":campanha", campanha) : redirect

    return <ListItemButton
      key={id}
      selected={selectedIndex === id}
      onClick={(event) => handleListItemClick(event, id, redirect)}
    >
      {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
      <ListItemText primary={title} />
    </ListItemButton>
  });

  return <Box pt={3} pb={1} px={4} textAlign="center">
    <Box component={Button} to={`/home/${marca}`} display="flex" alignItems="center" justifyContent={"center"} gap={1} marginY={2}>
      <Box component="img" src={LogoDark} alt="Southrock HUB" width="2rem" />
      <Typography component="h6" fontWeight="medium">
        Southrock HUB
      </Typography>
    </Box>
    <Divider
      light={!!darkMode}
    />
    <List component="nav" aria-label="main mailbox folders">
      {renderRoutes}
    </List>
  </Box>
}
