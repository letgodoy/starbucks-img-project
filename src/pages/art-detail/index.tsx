import { AlertContext, AuthContext, checkBrand, Layout } from "@components";
import { useGetArtByID, useUpdateArt, zipFile } from "@dataAccess";
import { Attribute, Box, Button, Grid, Typography } from "@elements";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { IArt, IStorageImage } from "@types";
import { useContext, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const ArtDetail = () => {

  checkBrand()

  const { id } = useParams();

  const [openLightbox, setOpenLightbox] = useState(0)

  const loggedUser = useContext(AuthContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const { data } = useGetArtByID(id || "")

  const { mutateAsync, isLoading } = useUpdateArt()

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

  const handleDownload = async (e: any) => {
    e.preventDefault()

    if (data?.zipFile) return window.open(data.zipFile, '_blank');

    let files: Array<string> = []

    data?.images.map((img: IStorageImage) => {
      files.push(img.url.split("?alt=")[0])
    })

    const zipfolder = `art/${data?.id}.zip`

    const zipUrl = await zipFile(files, zipfolder).then(res => res.url)


    const newData = data as IArt

    if (typeof zipUrl === "string") {
      newData.zipFile = zipUrl
    } else {
      return setOpenError("Erro ao salvar. Tente novamente.")
    }

    mutateAsync(newData).then(res => {
      setOpenSuccess("Download pronto.")
    }).catch((e) => {
      console.warn("erro: " + e)
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
            <Slider {...settings}>
              {data?.images?.map((img: any, i: any) => {
                return <Box key={i} component="img" src={img.url} alt={img.ref} width="100%" marginY={4} onClick={() => setOpenLightbox(i + 1)} />
              })}
            </Slider>
            {openLightbox ? <Lightbox images={images} onClose={() => setOpenLightbox(0)} startIndex={openLightbox - 1} /> : null}
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
          <Attribute label="Observação" value={data?.observation} />
          <Attribute label="Tipo" value={data?.type} />
          <Attribute label="Ano" value={data?.year} />
          <Attribute label="Especificação" value={data?.specification} />
          <Attribute label="Tags" value={data?.tags} />
          <Attribute label="Formato" value={data?.format} />
          <Attribute label="Campanha" value={data?.campaign.name} />
          <Attribute label="Data do carregamento" value={new Date(data?.createdAt).toLocaleString('pt-BR')} />
          <Attribute label="Autor" value={data?.createdBy?.name} />
          {data?.approvedBy?.name ? <Attribute label="Aprovado por" value={data?.approvedBy?.name} /> : null}
          {data?.refusedBy?.name ? <Attribute label="Recusado por" value={data?.refusedBy?.name} /> : null}
          <Button onClick={(e) => handleDownload(e)} sx={{ marginY: "1rem" }}>Download</Button>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
