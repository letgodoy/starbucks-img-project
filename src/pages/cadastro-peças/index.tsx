import { AlertContext, Layout } from "@components";
import { useCreatePiece } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { IPiece, IStorageImage } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";

export const CadastroPeca = ({ params }: { params: { marca: string, campanha: string } }) => {

  const { marca, campanha } = params

  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreatePiece()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const tags: string[] = []
    const images: IStorageImage[] = [{
      url: extractString(data.get('url') as string),
      ref: extractString(data.get('ref') as string),
    }]

    const piece: IPiece = {
      name: extractString(data.get('name') as string),
      description: extractString(data.get('name') as string),
      tags,
      createdAt: new Date().toISOString(),
      createdBy: new Date().toISOString(),
      approvedBy: extractString(data.get('name') as string),
      type: extractString(data.get('name') as string),
      marca,
      campaign: campanha,
      mainImg: {
        url: extractString(data.get('url') as string),
        ref: extractString(data.get('ref') as string),
      },
      images,
    }

    mutateAsync(piece).then(res => {
      setOpenSuccess("Cadastrado com sucesso.")
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  return <Layout params={params}><Grid container sx={{ height: '100vh' }}>
    <Grid item xs={12} sm={8} md={5}
    >
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
          Cadastro de peça
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Grid>
  </Grid>
  </Layout>
}
