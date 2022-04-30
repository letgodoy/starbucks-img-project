import { Layout } from "@components";
import { useCreatePiece } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { IImage, IPiece, IStorageImage } from "@types";
import { extractString } from "@utils";
import React from "react";

export const CadastroImagens = ({ params }: { params: { marca: string, campanha: string } }) => {

  const { marca, campanha } = params

  const { mutateAsync, isLoading } = useCreatePiece()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const tags: string[] = []

    const piece: IImage = {
      name: extractString(data.get('name') as string),
      description: extractString(data.get('name') as string),
      tags,
      createdAt: new Date().toISOString(),
      createdBy: new Date().toISOString(),
      approvedBy: extractString(data.get('name') as string),
      product: extractString(data.get('name') as string),
      marca,
      mainImg: {
        url: extractString(data.get('url') as string),
        ref: extractString(data.get('ref') as string),
      },
    }

    mutateAsync(piece).then(res => {
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
            Cadastro de imagens
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
            <TextInput
              margin="normal"
              required
              fullWidth
              id="cnpj"
              label="Cnpj"
              name="cnpj"
              autoComplete="cnpj"
              autoFocus
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