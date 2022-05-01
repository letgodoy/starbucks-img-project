import { Layout } from "@components";
import { Masonry } from "@mui/lab";
import { useGetImages } from "@dataAccess";

export const Dashboard = ({ params }: { params: { marca: string } }) => {

  const { marca } = params

  const { data } = useGetImages(marca)

  const Items = data?.map((item, index) => (
    <div key={index}>
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
  ))

  return <Layout title="Inicio" marca={marca}>
    <Masonry columns={3} spacing={2}>
      <>{Items}</>
    </Masonry>
  </Layout>

}
