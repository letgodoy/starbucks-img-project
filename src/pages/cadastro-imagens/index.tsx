import { AlertContext, Layout } from "@components";
import { uploadImage, useCreateImage } from "@dataAccess";
import { Box, Button, FileUploadInput, Grid, Loading, TextInput, Typography } from "@elements";
import { IFileStorage, IImage } from "@types";
import { extractString } from "@utils";
import React, { useContext, useState } from "react";
import { TagsInput } from "../../elements/tagInput";

export const CadastroImagens = ({ params }: { params: { marca: string } }) => {

  const { marca } = params

  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const [file, setFile] = useState(null);
  const [tags, setTags] = useState<Array<string>>([]);
  const [loadingFile, setLoadingFile] = useState<boolean>(false)

  const { mutateAsync, isLoading } = useCreateImage()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

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
        const image: IImage = {
          id: storageFile.fileName,
          name: extractString(data.get('name') as string),
          description: extractString(data.get('description') as string),
          year: extractString(data.get('year') as string),
          tags,
          createdAt: new Date().toISOString(),
          createdBy: new Date().toISOString(),
          product: extractString(data.get('product') as string),
          marca,
          mainImg: upload,
        }

        mutateAsync(image).then(res => {
          console.log(res)
          setOpenSuccess("Imagem salva com sucesso")
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
            Cadastro de imagens
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