import { AuthContext } from "@components";
import { Box, Grid, Typography } from "@elements";
import { FC, PropsWithChildren, useContext } from "react";

export const Layout: FC<PropsWithChildren<{title: string, marca: string}>> = ({ children, title, marca }: any) => {

  const context = useContext(AuthContext)

  return <Grid container sx={{ height: '100vh' }}>
    <Grid item xs={12}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {title} - {marca}
        </Typography>
        {children}
      </Box>
    </Grid>
  </Grid>
}
