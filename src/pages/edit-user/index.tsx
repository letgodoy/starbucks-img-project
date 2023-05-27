import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AlertContext, AuthContext, Layout, checkBrand } from "../../components"
import { useEditUser, useFindUser, useGetAgencies, useGetPhotographers, useGetStores } from "../../dataAccess"
import { Loading, MaskedInput, TextInput } from "../../elements"
import { UserRoles } from "../../enums/UserRoles"
import { useValidateUserRole } from "../../hooks/useValidateUserRole"
import { IAgency, IPhotographer, IStore, IUser } from "../../types"
import { extractString } from "../../utils"
import { userTypeFilteredByRole } from "../../utils/userTypeFilteredByRole"

export const EditUser = () => {
  const canCreate = useValidateUserRole([UserRoles.ADMIN, UserRoles.DISTRICTMANAGER, UserRoles.MANAGERAGENCY, UserRoles.MANAGERPHOTO, UserRoles.MANAGERSTORE, UserRoles.OPERATIONMANAGER]);

  const navigate = useNavigate();

  const params = useParams();

  checkBrand()

  const { data: selectedUser, status } = useFindUser(params.id);

  const { mutateAsync, isLoading } = useEditUser()
  const { data: listStores } = useGetStores()
  const { data: listAgencies } = useGetAgencies()
  const { data: listPhotography } = useGetPhotographers()

  const [role, setRole] = useState<string>("")
  const [form, setForm] = useState<ReactElement | null>(null)
  const [store, setStore] = useState<IStore | null>(null)
  const [agency, setAgency] = useState<IAgency | null>(null)
  const [photography, setPhotography] = useState<IPhotographer | null>(null)

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  if (!canCreate) navigate('/marcas');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const now = new Date().toISOString()

    const user: Omit<IUser, 'createdAt' | 'createdBy'> = {
      email: extractString(data.get('email') as string),
      name: extractString(data.get('name') as string),
      avatar: extractString(data.get('avatar') as string),
      role: role,
      store: store || null,
      agency: agency || null,
      photographer: photography || null,
      phone: extractString(data.get('phone') as string),
      cargo: extractString(data.get('cargo') as string),
      lastUpdated: now,
      uid: selectedUser?.uid
    }

    console.log(user)

    mutateAsync(user).then(res => {
      setOpenSuccess("Editado com sucesso.")
      event.currentTarget.reset()
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  const handleCompany = (value: string | null, list: IStore[] | IAgency[] | IPhotographer[] | undefined, setCompany: Dispatch<SetStateAction<IStore | IAgency | IPhotographer | null>>) => {
    const company: IStore | IAgency | IPhotographer | null = value ? list?.find(item => item.slug = value) || null : null
    setCompany(company)
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
      defaultValue={selectedUser?.name}
      autoFocus
    />
    <TextInput
      margin="normal"
      required
      fullWidth
      id="cargo"
      label="Cargo"
      name="cargo"
      defaultValue={selectedUser?.cargo}
    />
    <MaskedInput
      margin="normal"
      required
      fullWidth
      id="phone"
      label="Telefone"
      name="phone"
      mask="(99) 99999-9999"
      defaultValue={selectedUser?.phone}
    />
    <TextInput
      margin="normal"
      required
      fullWidth
      id="email"
      label="E-mail"
      name="email"
      defaultValue={selectedUser?.email}
    />
  </>

  const SelectStoreElement = <FormControl fullWidth sx={{ marginY: 3 }}>
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
  </FormControl>

  const SelectAgencyElement = <FormControl fullWidth sx={{ marginY: 3 }}>
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
  </FormControl>

  const SelectPhotographyElement = <FormControl fullWidth sx={{ marginY: 3 }}>
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
  </FormControl>

  useEffect(() => {
    if (selectedUser && status === "success") {
      setRole(selectedUser.role)
      setAgency(selectedUser.agency)
      setStore(selectedUser.store)
      setPhotography(selectedUser.photographer)
    }
  }, [selectedUser, status])

  useEffect(() => {
    switch (role) {
      case "admin":
      case "operationManager":
      case "districtManager":
        return setForm(BasicFields)
      case "managerStore":
        return setForm(<>
          {SelectStoreElement}
          {BasicFields}
        </>)
      case "managerAgency":
      case "userAgency":
        return setForm(<>
          {SelectAgencyElement}
          {BasicFields}
        </>)
      case "managerPhoto":
      case "userPhoto":
        return setForm(<>
          {SelectPhotographyElement}
          {BasicFields}
        </>)
      default:
        setForm(null)
    }
  }, [role])

  return (
    <Layout>
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
              Editar usuário
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
                {userTypeFilteredByRole(loggedUser.user.role).map((item, key) => {
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
                Editar
              </Button>)}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}