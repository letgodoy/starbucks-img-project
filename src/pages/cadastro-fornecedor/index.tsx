import { AlertContext, CompanyForm, Layout } from "@components";
import { useCreateProvider } from "@dataAccess";
import { Box, Button, Checkbox, Grid, TextInput, Typography } from "@elements";
import { FormControl, FormControlLabel, Modal } from "@mui/material";
import { IProvider } from "@types";
import { extractString } from "@utils";
import { FormEvent, useContext, useState } from "react";

export const CadastroFornecedor = ({ params }: any) => {
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { mutateAsync, isLoading } = useCreateProvider()

  const [open, setOpen] = useState(false);
  const [stdForm, setStdForm] = useState<IProvider | null>();
  const [productionEmail, setProductionEmail] = useState<string | null>();

  const handleSubmit = async (provider: IProvider) => {

    mutateAsync(provider).then(res => {
      setOpenSuccess("Loja salva com sucesso.")
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  const handleSTDForm = (form: any) => {
    setOpen(true)
    setStdForm(form)
  }

  const handleCompleteForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = extractString(data.get('productionEmail') as string)

    if (stdForm) {
      handleSubmit({...stdForm, productionEmail: email})
      setOpen(false)
    }
  }

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    maxWidth: "600px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

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
            Cadastro de fornecedor de material
          </Typography>
          <CompanyForm handleSubmit={handleSTDForm} isLoading={!!isLoading} />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="Coloque o e-mail que irá receber os pedidos das artes"
            title="Coloque o e-mail que irá receber os pedidos das artes"
          >
            <Box sx={styleModal} paper={2}>
              <Grid container>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
                  <Typography component="h1" variant="h5">
                    Coloque o e-mail que irá receber os pedidos das artes
                  </Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleCompleteForm}
                  width="100%"
                  height='200px'
                  paddingY={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <TextInput
                    margin="normal"
                    required
                    fullWidth
                    id="productionEmail"
                    label="E-mail para produção"
                    name="productionEmail"
                    autoComplete="productionEmail"
                    autoFocus
                    type="email"
                    value={productionEmail}
                    onChange={(event) => setProductionEmail(event.target.value)}
                  />
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="sameEmail"
                          checked={productionEmail === stdForm?.managerEmail}
                          onChange={(event) => setProductionEmail(event?.target.checked ? stdForm?.managerEmail : null)}
                        />
                      }
                      label="Usar o mesmo e-mail de gerente"
                    />
                  </FormControl>
                  <Button type="submit" sx={{ my: 2, mx: "auto" }}>Concluído</Button>
                </Box>
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
