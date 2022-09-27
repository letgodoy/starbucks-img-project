import { AlertContext, AuthContext, Layout } from "@components";
import { useGetEventByID, useUpdateEvent } from "@dataAccess";
import { Attribute, Box, Button, Grid, Typography } from "@elements";
import { Masonry } from "@mui/lab";
import { IArt } from "@types";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { verifyBrand } from "../../utils";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

export const EventDetail = () => {

  verifyBrand()

  const [openLightbox, setOpenLightbox] = useState(0)

  const { id } = useParams();

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { data } = useGetEventByID(id || "")

  const { mutateAsync, isLoading } = useUpdateEvent()

  const changeStatus = (e: any, status: string) => {
    e.preventDefault()

    if (!data) return null

    const imgUpdated = data as IArt

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

  const images = data?.images?.map((img: any) => {
    return {
      url: img.url,
      title: img.ref
    }
  })

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
          <Box width={"100%"} color="black" style={{ color: "black !important" }}>
            <Masonry columns={2} spacing={1}>
              {data?.images?.map((img: any, i: any) => {
                return <Box key={i} component="img" src={img.url} alt={img.ref} width="100%" marginY={4} onClick={() => setOpenLightbox(i+1)} />
              })}
            </Masonry>
            {openLightbox ? <Lightbox images={images} onClose={() => setOpenLightbox(0)} startIndex={openLightbox-1} /> : null}
          </Box>
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
          <Attribute label="Ano" value={data?.year} />
          <Attribute label="Tags" value={data?.tags} />
          <Attribute label="Data do carregamento" value={new Date(data?.createdAt).toLocaleString('pt-BR')} />
          <Attribute label="Autor" value={data?.createdBy?.name} />
          {data?.approvedBy?.name ? <Attribute label="Aprovado por" value={data?.approvedBy?.name} /> : null}
          {data?.refusedBy?.name ? <Attribute label="Recusado por" value={data?.refusedBy?.name} /> : null}
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
