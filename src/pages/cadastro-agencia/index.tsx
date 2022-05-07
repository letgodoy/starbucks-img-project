import { AlertContext, AuthContext, CompanyForm, Layout } from "@components";
import { useCreateAgency } from "@dataAccess";
import { Attribute, Box, Button, Grid, Loading, MaskedInput, TextInput, Typography } from "@elements";
import { Divider } from "@mui/material";
import { Address, IAgency } from "@types";
import { extractString, getAddressByCep } from "@utils";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Slugify from "slugify";

export const CadastroAgencia = ({ params }: any) => {
  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreateAgency()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const now = new Date().toISOString()

    console.log(data.entries())

    const agency: IAgency = {
      slug: Slugify(extractString(data.get('name') as string)),
      name: extractString(data.get('name') as string),
      cnpj: extractString(data.get('cnpj') as string),
      address: extractString(data.get('address') as string),
      manager: extractString(data.get('manager') as string),
      managerPhone: extractString(data.get('managerPhone') as string),
      managerEmail: extractString(data.get('managerEmail') as string),
      createdAt: now,
      createdBy: loggedUser.user.uid,
      lastUpdated: now
    }

    // mutateAsync(agency).then(res => {
    //   setOpenSuccess("Loja salva com sucesso.")
    //   event.currentTarget.reset()
    // }).catch(error => {
    //   console.warn("erro: " + error)
    //   setOpenError("Erro ao salvar. Tente novamente.")
    // })
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
            Cadastro de agência
          </Typography>
          <CompanyForm handleSubmit={handleSubmit} isLoading={!!isLoading} />
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
