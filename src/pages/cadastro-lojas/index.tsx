import { AlertContext, AuthContext, Layout } from "@components";
import { useCreateStore } from "@dataAccess";
import { Box, Button, Grid, Loading, TextInput, Typography } from "@elements";
import { IStore } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";
import Slugify from "slugify";

export const CadastroLoja = ({ params }: any) => {

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreateStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const now = new Date().toISOString()

    const store: IStore = {
      slug: Slugify(extractString(data.get('name') as string)),
      name: extractString(data.get('name') as string),
      cnpj: extractString(data.get('cnpj') as string),
      address: extractString(data.get('address') as string),
      manager: extractString(data.get('manager') as string),
      managerPhone: extractString(data.get('managerPhone') as string),
      managerEmail: extractString(data.get('managerEmail') as string),
      createdAt: now,
      createdBy: loggedUser.user.uid,
      lastUpdated: now
    }

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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            <TextInput
              margin="normal"
              required
              fullWidth
              id="cnpj"
              label="Cnpj"
              name="cnpj"
              autoComplete="cnpj"
              autoFocus
            // mask="000.000.000/0000-00"
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="address"
              label="Endereço"
              name="address"
              autoComplete="address"
              autoFocus
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="manager"
              label="Gerente"
              name="manager"
              autoComplete="manager"
              autoFocus
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="managerPhone"
              label="Telefone do gerente"
              name="managerPhone"
              autoComplete="managerPhone"
              autoFocus
              type="phone"
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="managerEmail"
              label="E-mail do gerente"
              name="managerEmail"
              autoComplete="managerEmail"
              autoFocus
              type="email"
            />
            {isLoading ? <Loading /> : <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
