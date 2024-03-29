import { Grid } from "@elements";
import { Alert, Container, Snackbar } from "@mui/material";
import { useContext } from "react";
import { AlertContext } from "../contexts/alerts";
import { NavBar } from "../navBar";
import { SideMenu } from "../sideMenu";

export const Layout = ({ children }: any) => {

  const { openError, openInfo, openWarning, openSuccess, setOpenError, setOpenInfo, setOpenSuccess, setOpenWarning } = useContext(AlertContext)

  const handleCloseSuccess = () => setOpenSuccess(false)
  const handleCloseError = () => setOpenError(false)
  const handleCloseWarning = () => setOpenWarning(false)
  const handleCloseInfo = () => setOpenInfo(false)

  return <Grid container spacing={2} sx={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
    <Grid item xs={3} sx={{ height: '100%', maxWidth: '100px', padding: 2, alignItems: "stretch" }}>
      <SideMenu />
    </Grid>
    <Grid item xs={9} sx={{ height: '100%', Width: '100%', overflow: 'auto' }}>
      <NavBar />
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
}
