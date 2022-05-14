import LogoDark from "@assets/southrock_preto_1_icon.png";
import { Box, Button, Typography } from "@elements";
import { Divider, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { routes } from "@utils";
import React, { useContext, useState } from "react";
import { useLocation } from "wouter";
import { BrandContext } from "@components";

export const SideMenu = ({ params }: { params?: { campanha: string } }) => {

  const { selectedBrand } = useContext(BrandContext)

  const marca = selectedBrand?.slug || "";

  const { campanha } = params || { campanha: "" }

  const darkMode = false

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

  return <Paper elevation={3} sx={{ height: "96vh", margin: 2, borderRadius: 2, padding: 2, background: "linear-gradient(142deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0.05) 100%)" }}>
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
      {renderRoutes}
    </List>
  </Paper>
}
