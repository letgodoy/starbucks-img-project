import { Attribute, Box, Button, Loading, MaskedInput, TextInput } from "@elements";
import { Divider } from "@mui/material";
import { Address } from "@types";
import { getAddressByCep } from "@utils";
import { FormEvent, useCallback, useEffect, useState } from "react";

export const CompanyForm = ({ handleSubmit, isLoading }: { handleSubmit: any, isLoading: boolean }) => {
  const darkMode = false

  const [cep, setCep] = useState<string | undefined>()
  const [address, setAddress] = useState<Address | null>(null)

  const addressAttributes = address && cep ? <Box sx={{
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    columnGap: 3
  }}>
    <TextInput
      margin="normal"
      required
      fullWidth
      id="address"
      label="Endereço"
      name="address"
      autoComplete="address"
      value={address.logradouro}
      disabled
    />
    <TextInput
      margin="normal"
      required
      id="addressNumber"
      label="Numero"
      name="addressNumber"
      autoComplete="addressNumber"
      autoFocus
    />
    <TextInput
      margin="normal"
      id="addressComplement"
      label="Complemento"
      name="addressComplement"
      autoComplete="addressComplement"
    />
    <TextInput
      margin="normal"
      required
      id="district"
      label="Bairro"
      name="district"
      autoComplete="district"
      value={address.bairro}
      disabled
    />
    <TextInput
      margin="normal"
      required
      id="city"
      label="Cidade"
      name="city"
      autoComplete="city"
      value={address.localidade}
      disabled
    />
    <TextInput
      margin="normal"
      required
      id="state"
      label="UF"
      name="state"
      autoComplete="state"
      value={address.uf}
      disabled
    />
    {/* <Attribute label="Bairro" value={address.bairro} sx={{ width: 300 }} />
    <Attribute label="Cidade" value={address.localidade} sx={{ width: 350 }} />
    <Attribute label="Estado" value={address.uf} sx={{ width: 100 }} /> */}
  </Box> : null

  useEffect(() => {

    const cepClean = cep?.replace(/([^\d])*/g, "")

    if (cepClean?.length == 8) {
      getAddressByCep(cepClean).then(res => setAddress(res))
    } else {
      setAddress(null)
    }

  }, [cep])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => useCallback(() => {
    // event.preventDefault();
    handleSubmit(event)
  }, [handleSubmit])

  return <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
    <MaskedInput
      margin="normal"
      required
      fullWidth
      id="cnpj"
      label="Cnpj"
      name="cnpj"
      autoComplete="cnpj"
      autoFocus
      mask="999.999.999/9999-99"
    />
    <Divider
      light={!!darkMode}
      sx={{ marginY: 2 }}
    />
    <MaskedInput
      margin="normal"
      required
      fullWidth
      id="addressCep"
      label="CEP"
      name="addressCep"
      autoComplete="addressCep"
      autoFocus
      value={cep}
      onChange={(e) => setCep(e.target.value)}
      mask="99999-999"
    />
    {addressAttributes}
    <Divider
      light={!!darkMode}
      sx={{ marginY: 2 }}
    />
    <TextInput
      margin="normal"
      required
      fullWidth
      id="manager"
      label="Gerente"
      name="manager"
      autoComplete="manager"
      autoFocus
    />
    <MaskedInput
      margin="normal"
      required
      fullWidth
      id="managerPhone"
      label="Telefone do gerente"
      name="managerPhone"
      autoComplete="managerPhone"
      autoFocus
      type="phone"
      mask="(99) 99999-9999"
    />
    <TextInput
      margin="normal"
      required
      fullWidth
      id="managerEmail"
      label="E-mail do gerente"
      name="managerEmail"
      autoComplete="managerEmail"
      autoFocus
      type="email"
    />
    {isLoading ? <Loading /> : <Button
      type="submit"
      fullWidth
      sx={{ mt: 3, mb: 2 }}
    >
      Salvar
    </Button>}
  </Box>
}
