import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingModal = ({ open, onClose }: { open: boolean, onClose: any }) => {

  return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", flexDirection: "column" }}
    open={open}
    onClick={onClose}
  >
    <CircularProgress color="inherit" />
    <p>Carregando...</p>
  </Backdrop>
}