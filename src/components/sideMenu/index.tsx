import LogoDark from "@assets/southrock_preto_1_icon.png";
import { Box, Button, Typography } from "@elements";
import { Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { routes } from "@utils";
import React, { useState } from "react";
import { useLocation } from "wouter";

export const SideMenu = ({ params }: { params?: { marca: string, campanha: string } }) => {

  const { marca, campanha } = params || { marca: "", campanha: "" }

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

    const redirect = path.replace(":marca", marca).replace(":campanha", campanha)

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
    <Button href={`/home/${marca}`} sx={{ marginY: 2, paddingY: 1 }} fullWidth>
      <Box display="flex" alignItems="center" justifyContent={"center"} gap={1} >
        <Box component="img" src={LogoDark} alt="Southrock HUB" width="2rem" />
        <Typography component="h6" fontWeight="medium">
          Southrock HUB
        </Typography>
      </Box>
    </Button>
    <Divider
      light={!!darkMode}
    />
    <List component="nav" aria-label="main mailbox folders">
      {renderRoutes}
    </List>
  </Box>
}
