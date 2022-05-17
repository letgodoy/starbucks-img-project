import { AlertContext, AuthContext, BrandContext, Layout } from "@components";
import { uploadImage, useCreateImage, useGetCampaigns, useGetProducts } from "@dataAccess";
import { Box, Button, FileUploadInput, Grid, Loading, Select, TextInput, Typography } from "@elements";
import { IArt, ICampaign, ICategory, IFileStorage, IImage } from "@types";
import { extractString } from "@utils";
import React, { useContext, useState } from "react";
import { useLocation } from "wouter";
import { TagsInput } from "../../elements/tagInput";

export const CadastroArte = ({ params }: { params: { marca: string } }) => {

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user } = useContext(AuthContext)

  const [location, setLocation] = useLocation();

  if (!marca) setLocation("/marcas")

  const { data: listCampaigns } = useGetCampaigns(marca?.slug || "")

  let listCampaignsSelect: ({ name: string; value: string; } | null)[] = []

  listCampaigns?.map((item: ICampaign) => {
    return listCampaignsSelect.push({ name: item.name, value: item.slug })
  })

  const [file, setFile] = useState(null);
  const [tags, setTags] = useState<Array<string>>([]);
  const [campaign, setCampaign] = useState<string>("");
  const [loadingFile, setLoadingFile] = useState<boolean>(false)

  const { mutateAsync, isLoading } = useCreateImage()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!marca) throw Error("Não foi possível selecionar a marca")

    const campanha = listCampaigns?.find(item => item.slug = campaign)

    if (!campanha) throw Error("Não foi possível selecionar a campanha")

    let upload = {
      url: "",
      ref: ""
    }

    if (file) {
      setLoadingFile(true)
      const storageFile: IFileStorage = await uploadImage(file) as IFileStorage

      upload.url = storageFile.url
      upload.ref = storageFile.fileName

      if (storageFile.url) {
        const art: IArt = {
          id: storageFile.fileName,
          name: extractString(data.get('name') as string),
          description: extractString(data.get('description') as string),
          year: extractString(data.get('year') as string),
          tags,
          createdAt: new Date().toISOString(),
          createdBy: user,
          marca,
          mainImg: upload,
          category: campanha
        }

        mutateAsync(art).then(res => {
          console.log(res)
          setOpenSuccess("Imagem salva com sucesso")
          event.currentTarget.reset()
        }).catch(error => alert("erro: " + error))
      } else {
        setOpenError("Algo de errado aconteceu. Tente novamente")
      }
      setLoadingFile(false)
    }
  }

  const handleSelecetedTags = (items: Array<string>) => {
    console.log(items);
    // setTags(items)
  }

  const handleImage = async (file: any) => {
    setFile(file)
  };

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
            Cadastro de arte
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextInput
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextInput
              margin="normal"
              fullWidth
              id="description"
              label="Descrição"
              name="description"
              autoComplete="description"
              multiline
              maxRows={3}
              autoFocus
            />
            <TextInput
              margin="normal"
              fullWidth
              id="product"
              label="Produto"
              name="product"
              autoComplete="product"
              autoFocus
            />
            <TextInput
              margin="normal"
              fullWidth
              id="year"
              label="Ano"
              name="year"
              autoComplete="year"
              autoFocus
            />
            <TagsInput
              selectedTags={(e) => handleSelecetedTags(e)}
              fullWidth
              variant="outlined"
              id="tags"
              name="tags"
              placeholder="Tags"
              label="Tags"
              tags={tags}
            />
            <Select
              id="selectCampaign"
              value={campaign}
              label="Selecione a campanha"
              onChange={(event) => setCampaign(event.target.value as string)}
              listData={listCampaignsSelect}
            />
            <Select
              id="selectProduct"
              value={product}
              label="Selecione o produto"
              onChange={(event) => setProduct(event.target.value as string)}
              listData={listProductsSelect}
            />
            <FileUploadInput handleChange={handleImage} multiple={false} />
            {isLoading || loadingFile ? <Loading /> : <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}