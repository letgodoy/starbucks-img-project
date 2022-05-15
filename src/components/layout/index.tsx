import { Grid } from "@elements";
import { Alert, Container, Snackbar } from "@mui/material";
import { useContext } from "react";
import { AlertContext } from "../contexts/alerts";
import { NavBar } from "../navBar";
import { SideMenu } from "../sideMenu";

export const Layout = ({ children, params }: any) => {

  const { openError, openInfo, openWarning, openSuccess, setOpenError, setOpenInfo, setOpenSuccess, setOpenWarning } = useContext(AlertContext)

  const handleCloseSuccess = () => setOpenSuccess(false)
  const handleCloseError = () => setOpenError(false)
  const handleCloseWarning = () => setOpenWarning(false)
  const handleCloseInfo = () => setOpenInfo(false)

  return <Grid container spacing={3} maxHeight="100vh">
    <Grid item xs={3} maxHeight="100vh">
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
            <Snackbar open={!!openInfo} autoHideDuration={6000} onClose={handleCloseInfo} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert onClose={handleCloseInfo} variant="filled" severity="info" sx={{ width: '100%' }}>
                {openInfo}
              </Alert>
            </Snackbar>
            <Snackbar open={!!openWarning} autoHideDuration={6000} onClose={handleCloseWarning} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert onClose={handleCloseWarning} variant="filled" severity="warning" sx={{ width: '100%' }}>
                {openWarning}
              </Alert>
            </Snackbar>
            <Snackbar open={!!openError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert onClose={handleCloseError} variant="filled" severity="error" sx={{ width: '100%' }}>
                {openError}
              </Alert>
            </Snackbar>
            <Snackbar open={!!openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert onClose={handleCloseSuccess} variant="filled" severity="success" sx={{ width: '100%' }}>
                {openSuccess}
              </Alert>
            </Snackbar>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}
