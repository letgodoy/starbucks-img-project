import { Layout } from "@components";
import { useGetImages } from "@dataAccess";
import { Masonry } from "@mui/lab";
import { Link } from "wouter";

export const Dashboard = ({ params }: { params: { marca: string } }) => {

  const { marca } = params

  const { data } = useGetImages(marca)

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
    <Masonry columns={3} spacing={2}>
      <>{Items}</>
    </Masonry>
  </Layout>

}
