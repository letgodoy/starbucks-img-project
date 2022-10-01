import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { useCreateCategory } from "@dataAccess";
import { Box, Button, Grid, Loading, TextInput, Typography } from "@elements";
import { ICategory } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slugify from "slugify";

export const CadastroCategoria = () => {

  const { selectedBrand: marca } = useContext(BrandContext);

  checkBrand()

  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreateCategory();

  const { user } = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!marca) throw "Não foi possível selecionar a marca"

    const category: ICategory = {
      name: extractString(data.get('name') as string),
      slug: Slugify(extractString(data.get('name') as string)),
      createdAt: new Date().toISOString(),
      createdBy: user,
      marca,
      marcaSlug: marca.slug,
    }

    mutateAsync(category).then(res => {
      console.log(res)
      setOpenSuccess("Cadastrado com sucesso.")
      event.currentTarget.reset()
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  return <Layout>
    <Grid container>
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
            Cadastro de categoria
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

