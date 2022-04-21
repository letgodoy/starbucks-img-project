import { Box, Grid } from "@elements";
import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import { useGetBrands } from "@dataAccess";

export const Dashboard = () => {

  const { data } = useGetBrands()

  return <Grid container>
    <Grid container >

      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
            os clientes aqui
            <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
      {data?.map(item => <Avatar key={item.name} sx={{ m: 1, bgcolor: 'secondary.main', width: 70, height: 70 }}>
                    {item.name}
                </Avatar>)}
                </Box>
      </Box>
    </Grid>
  </Grid>
}
