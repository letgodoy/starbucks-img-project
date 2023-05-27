import { AlertContext, CompanyForm, Layout, checkBrand } from "@components";
import { useCreateStore } from "@dataAccess";
import { Box, Grid, Typography } from "@elements";
import { IStore } from "@types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../enums/UserRoles";
import { useValidateUserRole } from "../../hooks/useValidateUserRole";

export const CadastroLoja = ({ params }: any) => {
  const canCreate = useValidateUserRole([UserRoles.ADMIN, UserRoles.DISTRICTMANAGER]);

  const navigate = useNavigate();

  checkBrand()

  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreateStore()

  if (!canCreate) navigate("/marcas");

  const handleSubmit = async (store: IStore) => {
    mutateAsync(store).then(res => {
      setOpenSuccess("Loja salva com sucesso.")
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  return <Layout params={params}>
    <Grid container sx={{ height: '100vh' }}>
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
            Cadastro de loja
          </Typography>
          <CompanyForm handleSubmit={handleSubmit} isLoading={!!isLoading} isStore={true} />
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
