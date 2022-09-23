import { AlertContext, AuthContext, Layout } from "@components";
import { useGetEventByID, useUpdateEvent } from "@dataAccess";
import { Attribute, Box, Button, Grid, Typography } from "@elements";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Masonry } from "@mui/lab";
import { IArt } from "@types";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { verifyBrand } from "../../utils";

export const EventDetail = () => {

  verifyBrand()

  const { id } = useParams();

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { data } = useGetEventByID(id || "")

  const { mutateAsync, isLoading } = useUpdateEvent()

  const downloadFile = async () => {
    fetch(data?.images[0].url, {
      mode: 'no-cors',
    })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = data?.images[0].ref;
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosOutlinedIcon color="primary" fontSize="medium" />,
    nextArrow: <ArrowForwardIosOutlinedIcon color="primary" fontSize="medium" />,
    adaptiveHeight: true
  };

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
                return <Box key={i} component="img" src={img.url} alt={img.ref} width="100%" marginY={4} />
              })}
            </Masonry>
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
          {/* <a href={data?.images[0].url} download={data?.name}> */}
          <Button onClick={downloadFile} sx={{ marginY: 2 }}>Download</Button>
          {/* </a> */}
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
