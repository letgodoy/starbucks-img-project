import { AlertContext, AuthContext, Layout } from "@components";
import { useCreateBrand } from "@dataAccess";
import { Box, Button, Grid, Loading, TextInput, Typography } from "@elements";
import { IBrand } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slugify from "slugify";
import { UserRoles } from "../../enums/UserRoles";
import { useValidateUserRole } from "../../hooks/useValidateUserRole";

export const CadastroMarca = ({ params }: any) => {
  const canCreate = useValidateUserRole([UserRoles.ADMIN, UserRoles.DISTRICTMANAGER]);

  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useCreateBrand()

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  if (!canCreate) navigate("/marcas");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const now = new Date().toISOString()

    const brand: IBrand = {
      name: extractString(data.get('name') as string),
      slug: Slugify(extractString(data.get('name') as string)),
      avatar: "auhauha",
      createdAt: now,
      createdBy: loggedUser.user,
      lastUpdated: now
    }

    mutateAsync(brand).then(res => {
      setOpenSuccess("Loja salva com sucesso.")
      event.currentTarget.reset()
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
