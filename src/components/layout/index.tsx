import { AuthContext } from "@components";
import { Grid } from "@elements";
import { Container } from "@mui/material";
import { useContext } from "react";
import { NavBar } from "../navBar";
import { SideMenu } from "../sideMenu";

export const Layout = ({ children, params }: any) => {

  const context = useContext(AuthContext)

  return <Grid container spacing={3}>
    <Grid item xs={3}>
      <SideMenu params={params} />
    </Grid>
    <Grid item xs={9}>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Container>
            {children}
          </Container>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}
