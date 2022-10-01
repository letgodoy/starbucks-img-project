import { AlertContext, AuthContext, checkBrand, Layout } from "@components";
import { useGetImageByID, useUpdateImage } from "@dataAccess";
import { Attribute, Box, Button, Grid, Typography } from "@elements";
import { IImage } from "@types";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const ImgDetail = () => {

  checkBrand()

  const { id } = useParams()

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { data } = useGetImageByID(id || "")

  const { mutateAsync, isLoading } = useUpdateImage()

  const downloadFile = async () => {
    fetch(data?.mainImg.url, {
      mode: 'no-cors',
    })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = data?.mainImg.ref;
        a.href = blobUrl;
        a.target = "_blank"
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
  }

  const changeStatus = (e: any, status: string) => {
    e.preventDefault()

    if (!data) return null

    const imgUpdated = data as IImage

    if (status === "approve") {
      imgUpdated.approvedBy = loggedUser.user
      imgUpdated.refusedBy = "approve"
    } else if (status === "refused") {
      imgUpdated.approvedBy = "refused"
      imgUpdated.refusedBy = loggedUser.user
    }

    mutateAsync(imgUpdated).then(res => {
      setOpenSuccess("Atualizado com sucesso.")
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  return <Layout>
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={7}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="p" variant="button">
            {data?.name}
          </Typography>
          <Box component="img" src={data?.mainImg.url} alt={data?.name} width="100%" marginY={4} />

        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data?.approvedBy?.name || data?.refusedBy?.name ? null :
            <Box sx={{
              marginY: 2,
              display: 'flex',
              justifyContent: "space-around",
              flexDirection: 'row',
              alignItems: 'center',
              width: "100%"
            }}>
              <Button onClick={(e) => changeStatus(e, "approve")}>Aprovar</Button>
              <Button onClick={(e) => changeStatus(e, "refused")} color="secondary">Recusar</Button>
            </Box>
          }
          <Attribute label="Nome" value={data?.name} />
          <Attribute label="Descrição" value={data?.description} />
          <Attribute label="Produto" value={data?.product.name} />
          <Attribute label="Ano" value={data?.year} />
          <Attribute label="SKU" value={data?.sku} />
          <Attribute label="Tags" value={data?.tags} />
          <Attribute label="Formato" value={data?.format} />
          <Attribute label="Categoria" value={data?.category.name} />
          <Attribute label="Data do carregamento" value={new Date(data?.createdAt).toLocaleString('pt-BR')} />
          <Attribute label="Autor" value={data?.createdBy?.name} />
          <Attribute label="Validade" value={new Date(data?.validate).toLocaleString('pt-BR')} />
          {data?.approvedBy?.name ? <Attribute label="Aprovado por" value={data?.approvedBy?.name} /> : null}
          {data?.refusedBy?.name ? <Attribute label="Recusado por" value={data?.refusedBy?.name} /> : null}
          {/* <a href={data?.mainImg.url} download={data?.name}> */}
          <Button onClick={downloadFile} sx={{ marginY: 2 }}>Download</Button>
          {/* </a> */}
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
