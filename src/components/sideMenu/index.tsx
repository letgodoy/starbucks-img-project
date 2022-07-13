import LogoDark from "@assets/southrock_preto_1_icon.png";
import { BrandContext } from "@components";
import { Box, Button, Typography } from "@elements";
import { Divider, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { routes } from "@utils";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideMenu = () => {

  const { selectedBrand } = useContext(BrandContext)

  const marca = selectedBrand?.slug || "";

  const darkMode = true

  const [selectedIndex, setSelectedIndex] = useState(1);

  const navigate = useNavigate();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    path: string,
  ) => {
    setSelectedIndex(index);
    navigate(path)
  };

  const renderRoutes = routes.map(({ path, title, id, visibleMenu }) => {

    if (!visibleMenu) return null

    const redirect = path.replace(":marca", marca)

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

  return <Paper elevation={3} sx={{ position: "fixed", color: "white", height: "96vh", margin: 2, borderRadius: 2, padding: 2, background: "linear-gradient(142deg, #0a0a0a 0%, #202020 100%)" }}>
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
