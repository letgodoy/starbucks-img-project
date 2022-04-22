import { AuthContext } from "@components";
import { useCreateUser } from "@dataAccess";
import { Box, Button, Grid, Link, TextInput, Typography } from "@elements";
import { ICreateUser } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";

export const CadastroUser = () => {

  const { mutateAsync, isLoading } = useCreateUser()

  const context = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user: ICreateUser = {
      email: extractString(data.get('email') as string),
      password: extractString(data.get('password') as string),
      name: extractString(data.get('name') as string),
      avatar: extractString(data.get('avatar') as string),
      role: extractString(data.get('role') as string),
      store: extractString(data.get('store') as string),
      phone: extractString(data.get('phone') as string),
      cargo: extractString(data.get('cargo') as string),
    }

    mutateAsync(user).then(res => {
      console.log(res)
      alert("sucesso")
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
          <TextInput
            margin="normal"
            required
            fullWidth
            id="cargo"
            label="Cargo"
            name="cargo"
          />
          <TextInput
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Telefone"
            name="phone"
          />
          <TextInput
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
          />
          <TextInput
            margin="normal"
            required
            fullWidth
            id="password"
            label="E-mail"
            name="password"
          />
          {/* <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                  /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  </Grid>
}
