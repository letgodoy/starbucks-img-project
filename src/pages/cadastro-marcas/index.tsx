import { useCreateBrand } from "@dataAccess";
import { Box, Button, Grid, Link, TextInput, Typography } from "@elements";
import { IBrand } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";
import { AuthContext } from "@components";

export const CadastroMarca = () => {

  const { mutateAsync, isLoading } = useCreateBrand()

  const context = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const brand: IBrand = {
      name: extractString(data.get('name') as string),
      avatar: "auhauha"
    }

    mutateAsync(brand).then(res => {
      console.log(res)
      alert("xussexo")
    }).catch(error => alert("erro: " + error))
  }

  return <Grid container sx={{ height: '100vh' }}>
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
          Cadastro de usuário
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
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Grid>
  </Grid>
}
