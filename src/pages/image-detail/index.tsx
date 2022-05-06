import { Layout } from "@components";
import { useGetImageByID } from "@dataAccess";
import { Attribute, Box, Button, Grid, Typography } from "@elements";

export const ImgDetail = ({ params }: { params: { id: string } }) => {

  const { id } = params

  const { data } = useGetImageByID(id)

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
          <Typography component="p" variant="button">
            {data?.name}
          </Typography>
          <Box component="img" src={data?.mainImg.url} alt={data?.name} width="100%" marginY={4} />
          {/* <a href={data?.mainImg.url} download={data?.name}> */}
          <Button onClick={downloadFile} sx={{ marginY: 2 }}>Download</Button>
          {/* </a> */}
          <Attribute label="Nome" value={data?.name} />
          <Attribute label="Produto" value={data?.product} />
          <Attribute label="Ano" value={data?.year} />
          <Attribute label="Descrição" value={data?.description} />
          <Attribute label="Tags" value={data?.tags} />
        </Box>
      </Grid>
    </Grid>
  </Layout>
}
