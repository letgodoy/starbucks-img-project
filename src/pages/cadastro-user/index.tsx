import { AlertContext, AuthContext, Layout } from "@components";
import { useCreateUser, useGetAgencies, useGetPhotographers, useGetStores } from "@dataAccess";
import { Box, Button, Grid, Loading, MaskedInput, TextInput, Typography } from "@elements";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IAgency, ICreateUser, IPhotographer, IStore, ROLES } from "@types";
import { extractString, userType } from "@utils";
import React, { Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";

export const CadastroUser = ({ params }: any) => {

  const { mutateAsync, isLoading } = useCreateUser()
  const { data: listStores } = useGetStores()
  const { data: listAgencies } = useGetAgencies()
  const { data: listPhotography } = useGetPhotographers()

  const [role, setRole] = useState<ROLES | null>(null)
  const [form, setForm] = useState<ReactElement | null>(null)
  const [store, setStore] = useState<IStore | null>(null)
  const [agency, setAgency] = useState<IAgency | null>(null)
  const [photography, setPhotography] = useState<IPhotographer | null>(null)

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!role) throw new Error("Selecione um tipo de usuário");
    
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
      createdBy: loggedUser.user,
      lastUpdated: now
    }

    mutateAsync(user).then(res => {
      setOpenSuccess("Cadastrado com sucesso.")
      event.currentTarget.reset()
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  const handleCompany = (
    value: string | null, list: IStore[] | IAgency[] | IPhotographer[] | undefined, 
    setCompany: Dispatch<SetStateAction<IStore | IAgency | IPhotographer | null>>
    ) => {

      if (value) {
        const company: IStore | IAgency | IPhotographer | null = list?.find(item => item.slug = value) || null
        setCompany(company)
      } else {
        setCompany(null)
      }
    
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
    <MaskedInput
      margin="normal"
      required
      fullWidth
      id="phone"
      label="Telefone"
      name="phone"
      mask="(99) 99999-9999"
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

  const SelectStoreElement = listStores ? <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectStore">Selecione a loja</InputLabel>
    <Select
      labelId="selectStore"
      id="selectStoreElement"
      value={store?.slug}
      label="Selecione a loja"
      onChange={(event) => handleCompany(event.target.value, listStores as IStore[], setStore)}
    >
      {listStores?.map((item, index) => {
        return <MenuItem key={index} value={item.slug}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl> : null

  const SelectAgencyElement = listAgencies ? <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectAgency">Selecione a agência</InputLabel>
    <Select
      labelId="selectAgency"
      id="selectAgencyElement"
      value={agency?.slug}
      label="Selecione a agência"
      onChange={(event) => handleCompany(event.target.value, listAgencies as IAgency[], setAgency)}
    >
      {listAgencies?.map((item, index) => {
        return <MenuItem key={index} value={item.slug}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl> : null

  const SelectPhotographyElement = listPhotography ? <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectPhotography">Selecione a agência de fotografia</InputLabel>
    <Select
      labelId="selectPhotography"
      id="selectPhotographyElement"
      value={photography?.slug}
      label="Selecione a agência de fotografia"
      onChange={(event) => handleCompany(event.target.value, listPhotography as IPhotographer[], setPhotography)}
    >
      {listPhotography?.map((item, index) => {
        return <MenuItem key={index} value={item.slug}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl> : null

  useEffect(() => {
    switch (role) {
      case ROLES.admin:
      case ROLES.operationManager:
      case ROLES.districtManager:
        return setForm(BasicFields)
      case ROLES.managerStore:
        return setForm(<>
          {SelectStoreElement}
          {BasicFields}
        </>)
      case ROLES.managerAgency:
      case ROLES.userAgency:
        return setForm(<>
          {SelectAgencyElement}
          {BasicFields}
        </>)
      case ROLES.managerPhoto:
      case ROLES.userPhoto:
        return setForm(<>
          {SelectPhotographyElement}
          {BasicFields}
        </>)
      default:
        setForm(null)
    }
  }, [role])

  const setRoleForm = (value: string | null) => {
    if (!value || value === "") setRole(null)

    if (value) {
      // @ts-ignore
      setRole(ROLES[value])
    }
  }

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
              onChange={(event) => setRoleForm(event.target.value)}
              label="Tipo de usuário"
            >
              {userType?.map((item, key) => {
                return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {form}
            {form && (isLoading ? <Loading /> : <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>)}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
