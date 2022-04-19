import { Box, Grid } from "@elements";
import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import { AuthContext } from "../../components";

export const Brand = () => {

  const context = useContext(AuthContext)

  console.log(context)
  console.log("brand")

  return <Grid container>
    <Grid container xs={12} sm={8} md={5}
    // component={Paper} 
    // elevation={6} 
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      > os clientes aqui
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 70, height: 70 }}>
                    ssdasada sacsacd hasuihasiuchas
                </Avatar>
      </Box>
    </Grid>
  </Grid>
}
