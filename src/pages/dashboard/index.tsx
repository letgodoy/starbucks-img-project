import { Layout } from "@components";

export const Dashboard = ({ params }: { params: { marca: string } }) => {

  const { marca } = params

  return <Layout title="Inicio" marca={marca}>
    dashboard
  </Layout>

}
