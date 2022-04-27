import { useCreateCampaign } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { ICreateCampaign } from "@types";
import { extractString } from "@utils";
import React from "react";
import { Layout } from "@components";

export const CadastroCampanha = ({ params }: { params: { marca: string } }) => {

  const { marca } = params;

  const { mutateAsync, isLoading } = useCreateCampaign();

  // const { user, agency } = useContext(AuthContext)

  const user = {
    uid: "",
    name: "",
  }

  const agency = {
    cnpj: "",
    name: "",
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const campaign: ICreateCampaign = {
      name: extractString(data.get('name') as string),
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      createdByName: user.name,
      createdByAgency: agency.cnpj,
      createdByAgencyName: agency.name,
      marca
    }

    mutateAsync(campaign).then(res => {
      console.log(res)
      alert("sucesso")
    }).catch(error => alert("erro: " + error))
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
            Cadastro de campanha
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextInput
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
