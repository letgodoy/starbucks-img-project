import { AlertContext, AuthContext, BrandContext, Layout } from "@components";
import { uploadImage, useCreateArt, useGetCampaigns } from "@dataAccess";
import { Box, Button, FileUploadInput, Grid, Loading, Select, TextInput, Typography } from "@elements";
import { IArt, ICampaign, IFileStorage } from "@types";
import { extractString } from "@utils";
import React, { useContext, useState } from "react";
import Slugify from "slugify";
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

  const [files, setFiles] = useState<Array<any> | null>(null);
  const [tags, setTags] = useState<Array<string>>([]);
  const [campaign, setCampaign] = useState<string>("");
  const [loadingFile, setLoadingFile] = useState<boolean>(false)

  const { mutateAsync, isLoading } = useCreateArt()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if (!marca) throw Error("Não foi possível selecionar a marca")

      const campanha = listCampaigns?.find(item => item.slug = campaign)

      if (!campanha) throw Error("Não foi possível selecionar a campanha")

      if (files) {
        setLoadingFile(true)

        let imagesUploaded: { url: string; ref: string; }[] = []

        await Promise.all(files.map(async (image: any) => {
          const storageFile: IFileStorage = await uploadImage(image) as IFileStorage

          imagesUploaded.push({
            url: storageFile.url,
            ref: storageFile.fileName
          })
        }))

        console.log("aquiii")
        console.log(imagesUploaded)

        const name = extractString(data.get('name') as string)
        const year = extractString(data.get('year') as string)

        if (imagesUploaded.length == files.length) {
          console.log("aquiii 2")
          const art: IArt = {
            id: Slugify(`${year}-${campanha.slug}-${name}`),
            name,
            observation: extractString(data.get('observation') as string),
            year,
            tags,
            createdAt: new Date().toISOString(),
            createdBy: user,
            marca,
            marcaSlug: marca.slug,
            campaign: campanha,
            type: extractString(data.get('type') as string),
            images: imagesUploaded,
            format: extractString(data.get('format') as string),
            specification: extractString(data.get('specification') as string),
          }

          mutateAsync(art).then((res: any) => {
            console.log(res)
            setOpenSuccess("Cadastrado com sucesso.")
            event.currentTarget.reset()
          }).catch((error: string) => {
            console.warn("erro: " + error)
            setOpenError("Erro ao salvar. Tente novamente.")
          })
        } else {
          setOpenError("Algo de errado aconteceu. Tente novamente")
        }
        setLoadingFile(false)
      }
    } catch (e) {
      setOpenError(e as string)
    }
  }

  const handleSelecetedTags = (items: Array<string>) => {
    // console.log(items);
    // setTags(items)
  }

  const handleImage = async (file: any) => {
    setFiles(Object.values(file))
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
              id="observation"
              label="Observação"
              name="observation"
              autoComplete="observation"
              multiline
              maxRows={3}
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
              required
            />
            <TextInput
              margin="normal"
              fullWidth
              id="type"
              label="Tipo"
              name="type"
              autoComplete="type"
              autoFocus
              required
            />
            <TextInput
              margin="normal"
              fullWidth
              id="format"
              label="Formato"
              name="format"
              autoComplete="format"
              autoFocus
              required
            />
            <TextInput
              margin="normal"
              fullWidth
              id="specification"
              label="Especificação"
              name="specification"
              autoComplete="specification"
              autoFocus
              required
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
            <FileUploadInput handleChange={handleImage} multiple={true} />
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