import { BrandContext, Layout } from "@components";
import { useGetImages } from "@dataAccess";
import { Box, DataCard } from "@elements";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Masonry } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { Link } from "wouter";

export const Dashboard = ({ params }: { params: { marca: string } }) => {

  const marca = useContext(BrandContext)?.selectedBrand?.slug || params.marca

  const { data } = useGetImages(marca)

  const now = new Date()

  const [unavaliableImg, setUnavaliableImg] = useState(0)
  const [invalidImg, setInvalidImg] = useState(0)

  useEffect(() => {
    let countUnavabile = 0
    let countInvalid = 0

    data?.forEach(element => {
      if (!element.approvedBy) {
        countUnavabile++
      }

      if (element.validate) {
        const validade = new Date(element.validate).getTime()

        if (validade < now.getTime()) {
          countInvalid++
        }
      }
    });

    setUnavaliableImg(countUnavabile)
    setInvalidImg(countInvalid)

  }, [data])

  const Items = data?.map((item, index) => (
    <Link href={`/detalheimagem/${marca}/${item.id}`} key={index}>
      <div>
        <img
          src={item.mainImg.url}
          alt={item.mainImg.ref}
          loading="lazy"
          style={{
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            display: 'block',
            width: '100%',
          }}
        />
      </div>
    </Link>

  ))

  return <Layout title="Inicio" params={params} sx={{ paddingY: 3 }}>
    <Box width={"100%"} display="flex" flexDirection={"row"} flexWrap="wrap">
      <DataCard
        title="Total de imagens"
        count={data?.length || 0}
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
        count={data?.length || 0}
        percentage={[{
          amount: 123,
          label: "Artes sem avaliação"
        }]}
        icon={<BackupTableIcon fontSize="large" />}
      />
      <DataCard
        title="Pedidos"
        count={data?.length || 0}
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
