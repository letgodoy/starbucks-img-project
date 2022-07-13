import { BrandContext, Layout } from "@components";
import { useGetArts, useGetImages } from "@dataAccess";
import { Box, DataCard } from "@elements";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Masonry } from "@mui/lab";
import { Badge } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verifyBrand } from "../../utils";

export const Dashboard = () => {

  const marca = useContext(BrandContext)?.selectedBrand?.slug || ""

  verifyBrand()

  const { data: images } = useGetImages(marca)
  const { data: arts } = useGetArts(marca)

  const now = new Date().getTime()

  const [unavaliableImg, setUnavaliableImg] = useState(0)
  const [invalidImg, setInvalidImg] = useState(0)
  const [unavaliableArt, setUnavaliableArt] = useState(0)

  useEffect(() => {
    let countUnavabileImg = 0
    let countInvalid = 0
    let countUnavabileArts = 0

    images?.forEach(element => {
      if (!element.approvedBy && new Date(element.validate).getTime() > now) {
        countUnavabileImg++
      }

      if (element.validate) {
        const validade = new Date(element.validate).getTime()

        if (validade <= now) {
          countInvalid++
        }
      }
    });

    arts?.forEach(element => {
      if (!element.approvedBy) {
        countUnavabileArts++
      }
    });

    setUnavaliableImg(countUnavabileImg)
    setInvalidImg(countInvalid)
    setUnavaliableArt(countUnavabileArts)

  }, [images])

  const Items = images?.map((item, index) => {

    const Picture = ({ grayscale = false }) => <img
      src={item.mainImg.url}
      alt={item.mainImg.ref}
      loading="lazy"
      style={grayscale ? {
        filter: "grayscale(100%)",
        opacity: "0.5",
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        display: 'block',
        width: '100%',
      } : {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        display: 'block',
        width: '100%',
      }}
    />

    return <Link to={`/detalhe-imagem/${marca}/${item.id}`} key={index}>
      <div>
        {new Date(item.validate).getTime() <= now ?
          <Badge badgeContent={"Vencida"} color="warning" overlap="circular">
            <Picture grayscale />
          </Badge> :
          typeof item.approvedBy === "string" ?
            <Badge badgeContent={"Reprovada"} color="error" overlap="circular">
              <Picture grayscale />
            </Badge> :
            !item.approvedBy ?
              <Badge badgeContent={"N avaliada"} color="info" overlap="circular">
                <Picture />
              </Badge> :
              <Picture />
        }
      </div>
    </Link>
  })

  return <Layout title="Inicio" sx={{ paddingY: 3 }}>
    <Box width={"100%"} display="flex" flexDirection={"row"} flexWrap="wrap">
      <DataCard
        title="Total de imagens"
        count={images?.length || 0}
        percentage={[{
          amount: unavaliableImg,
          label: "Imagens sem avaliação"
        },
        {
          amount: invalidImg,
          label: "Imagens vencidas"
        }
        ]}
        icon={<CropOriginalIcon fontSize="large" />}
      />
      <DataCard
        title="Total de artes"
        count={arts?.length || 0}
        percentage={[{
          amount: unavaliableArt,
          label: "Artes sem avaliação"
        }]}
        icon={<BackupTableIcon fontSize="large" />}
      />
      <DataCard
        title="Pedidos"
        count={0}
        percentage={[{
          amount: 123,
          label: "Pedidos sem aprovação"
        }]}
        icon={<ListAltIcon fontSize="large" />}
      />
    </Box>

    <Masonry columns={3} spacing={2}>
      <>{Items}</>
    </Masonry>
  </Layout>

}
