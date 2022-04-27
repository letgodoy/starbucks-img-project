import { AuthContext } from "@components";
import { Box, Typography } from "@elements";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Stack } from "@mui/material";
import { FC, PropsWithChildren, useContext } from "react";
import { useLocation } from "wouter";

export const NavBar = ({ params }: { params?: { marca?: string, campanha?: string } }) => {

  const context = useContext(AuthContext)

  const [location, setLocation] = useLocation()

  const breadcrumbs = location.split("/").map((path, key) => {
    return path && <Typography key={key} color="text.primary">
      {path}
    </Typography>
  })

  return <Box pt={3} pb={1} px={4}>
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  </Box>
}
