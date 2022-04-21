import { useCreateStore } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { IStore } from "@types";
import { extractString } from "@utils";
import React from "react";

export const CadastroImg = () => {

  const { mutateAsync, isLoading } = useCreateStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const store: IStore = {
      name: extractString(data.get('name') as string),
      avatar: "auhauha"
    }

    mutateAsync(store).then(res => {
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
          Cadastro de loja
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
