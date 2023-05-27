import { AlertContext, CompanyForm, Layout, checkBrand } from "@components";
import { useCreateAgency } from "@dataAccess";
import { Box, Grid, Typography } from "@elements";
import { IAgency } from "@types";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../enums/UserRoles";
import { useValidateUserRole } from "../../hooks/useValidateUserRole";

export const CadastroAgencia = ({ params }: any) => {
  checkBrand()
  const canCreate = useValidateUserRole([UserRoles.ADMIN]);

  const navigate = useNavigate();
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreateAgency()

  if (!canCreate) navigate("/marcas");

  const handleSubmit = useCallback(async (agency: IAgency) => {
    mutateAsync(agency).then(res => {
      setOpenSuccess("Loja salva com sucesso.")
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }, [])

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
            Cadastro de agência
          </Typography>
          <CompanyForm handleSubmit={handleSubmit} isLoading={!!isLoading} />
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
