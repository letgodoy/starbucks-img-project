import { AlertContext, CompanyForm, Layout } from "@components";
import { useCreatePhotographer } from "@dataAccess";
import { Box, Grid, Typography } from "@elements";
import { IPhotographer } from "@types";
import { useContext } from "react";

export const CadastroFotografo = ({ params }: any) => {
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreatePhotographer()

  const handleSubmit = async (photographer: IPhotographer) => {

    mutateAsync(photographer).then(res => {
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
            Cadastro de agência de fotografia
          </Typography>
          <CompanyForm handleSubmit={handleSubmit} isLoading={!!isLoading} />
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
