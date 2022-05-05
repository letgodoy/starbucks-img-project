import { Layout } from "@components";
import { useGetImageByID } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import axios from "axios";
import fs from "fs"

export const ImgDetail = ({ params }: { params: { id: string } }) => {

  const { id } = params

  const { data } = useGetImageByID(id)

  console.log(data)
  const filepath = "/southrockHub"

  const downloadFile = async () => {
    const response = await axios({
      url: data?.mainImg.url,
      method: 'GET',
      responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(filepath))
        .on('error', reject)
        .once('close', () => resolve(filepath));
    });
  }

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
            {data?.name}
          </Typography>
          <Box component="img" src={data?.mainImg.url} alt={data?.name} width="100%" marginY={4} />
          <Button onClick={downloadFile} sx={{ marginY: 2 }}>Download</Button>
          <TextInput label="Nome" variant="standard" disabled value={data?.name} fullWidth sx={{ marginY: 2 }} />
          <TextInput label="Produto" variant="standard" disabled value={data?.product} fullWidth sx={{ marginY: 2 }} />
          <TextInput label="Ano" variant="standard" disabled value={data?.year} fullWidth sx={{ marginY: 2 }} />
          <TextInput label="Descrição" variant="standard" disabled value={data?.description} fullWidth sx={{ marginY: 2 }} />
          <TextInput label="Tags" variant="standard" disabled value={data?.tags} fullWidth sx={{ marginY: 2 }} />
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
