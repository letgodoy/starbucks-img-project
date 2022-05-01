import { AuthContext, Layout } from "@components";
import { useCreateBrand } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { IBrand } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";

export const CadastroMarca = ({ params }: any) => {

  const { mutateAsync, isLoading } = useCreateBrand()

  const context = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const brand: IBrand = {
      name: extractString(data.get('name') as string),
      slug: extractString(data.get('name') as string).replace(" ", "-"),
      avatar: "auhauha"
    }

    mutateAsync(brand).then(res => {
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
            Cadastro de marca
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
