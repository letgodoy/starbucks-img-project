import { AlertContext, AuthContext, Layout } from "@components";
import { useCreateUser, useGetAgencies, useGetPhotographers, useGetStores } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ICreateUser } from "@types";
import { extractString } from "@utils";
import React, { ReactElement, useContext, useEffect, useState } from "react";

export const CadastroUser = ({ params }: any) => {

  const { mutateAsync, isLoading } = useCreateUser()
  const { data: listStores } = useGetStores()
  const { data: listAgencies } = useGetAgencies()
  const { data: listPhotography } = useGetPhotographers()

  const [role, setRole] = useState<string>("")
  const [form, setForm] = useState<ReactElement | null>(null)
  const [store, setStore] = useState<string | null>(null)
  const [agency, setAgency] = useState<string | null>(null)
  const [photography, setPhotography] = useState<string | null>(null)

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const now = new Date().toISOString()

    const user: ICreateUser = {
      email: extractString(data.get('email') as string),
      password: extractString(data.get('password') as string),
      name: extractString(data.get('name') as string),
      avatar: extractString(data.get('avatar') as string),
      role: role,
      store: store,
      agency: agency,
      photographer: photography,
      phone: extractString(data.get('phone') as string),
      cargo: extractString(data.get('cargo') as string),
      createdAt: now,
      createdBy: loggedUser.user.uid || "tester",
      lastUpdated: now
    }

    mutateAsync(user).then(res => {
      setOpenSuccess("Cadastrado com sucesso.")
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  const BasicFields = <>
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
      label="Senha"
      name="password"
    />
  </>

  const SelectStoreElement = <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectStore">Selecione a loja</InputLabel>
    <Select
      labelId="selectStore"
      id="selectStoreElement"
      value={store}
      label="Selecione a loja"
      onChange={(event) => setStore(event.target.value)}
    >
      {/* <MenuItem value={""}>Selecione</MenuItem> */}
      {listStores?.map((item, index) => {
        return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl>

  const SelectAgencyElement = <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectAgency">Selecione a agência</InputLabel>
    <Select
      labelId="selectAgency"
      id="selectAgencyElement"
      value={agency}
      label="Selecione a agência"
      onChange={(event) => setAgency(event.target.value)}
    >
      {/* <MenuItem value={""}>Selecione</MenuItem> */}
      {listAgencies?.map((item, index) => {
        return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl>

  const SelectPhotographyElement = <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectPhotography">Selecione a agência de fotografia</InputLabel>
    <Select
      labelId="selectPhotography"
      id="selectPhotographyElement"
      value={photography}
      label="Selecione a agência de fotografia"
      onChange={(event) => setPhotography(event.target.value)}
    >
      {/* <MenuItem value={""}>Selecione</MenuItem> */}
      {listPhotography?.map((item, index) => {
        return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl>

  useEffect(() => {
    switch (role) {
      case "admin":
        return setForm(BasicFields)
      case "managerStore":
        return setForm(<>
          {SelectStoreElement}
          {BasicFields}
        </>)
      case "userStore":
        return setForm(<>
          {SelectStoreElement}
          {BasicFields}
        </>)
      case "managerAgency":
        return setForm(<>
          {SelectAgencyElement}
          {BasicFields}
        </>)
      case "userAgency":
        return setForm(<>
          {SelectAgencyElement}
          {BasicFields}
        </>)
      case "managerPhoto":
        return setForm(<>
          {SelectPhotographyElement}
          {BasicFields}
        </>)
      case "userPhoto":
        return setForm(<>
          {SelectPhotographyElement}
          {BasicFields}
        </>)
      default:
        setForm(null)
    }
  }, [role])

  return <Layout params={params}>
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
            Cadastro de usuário
          </Typography>
          <FormControl fullWidth sx={{ marginY: 3 }}>
            <InputLabel id="selectType">Tipo de usuário</InputLabel>
            <Select
              labelId="selectType"
              id="selectTypeElement"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              label="Tipo de usuário"
            >
              <MenuItem value="">
                <em> -- </em>
              </MenuItem>
              <MenuItem value={"admin"}>Administrador</MenuItem>
              <MenuItem value={"managerStore"}>Gerente de loja</MenuItem>
              <MenuItem value={"managerAgency"}>Gerente de agencia</MenuItem>
              <MenuItem value={"managerPhoto"}>Gerente de fotógrafos</MenuItem>
              <MenuItem value={"userStore"}>Usuário de loja</MenuItem>
              <MenuItem value={"userAgency"}>Usuário de agencia</MenuItem>
              <MenuItem value={"userPhoto"}>Usuário de fotógrafos</MenuItem>
            </Select>
          </FormControl>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {form}
            {form && <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
