import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { uploadImage, useCreateImage, useGetCategories, useGetProducts } from "@dataAccess";
import { Box, Button, FileUploadInput, Grid, Loading, Select, TextInput, Typography } from "@elements";
import { colors } from "@mui/material";
import { ICategory, IFileStorage, IImage, IProduct } from "@types";
import { extractString } from "@utils";
import React, { useContext, useState } from "react";
import { TagsInput } from "../../elements/tagInput";

export const CadastroImagens = () => {

  const { selectedBrand: marca } = useContext(BrandContext)

  checkBrand()

  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user } = useContext(AuthContext)

  const { data: listCategories } = useGetCategories(marca?.slug || "")
  const { data: listProducts } = useGetProducts(marca?.slug || "")

  let listCategoriesSelect: ({ name: string; value: string; })[] = []

  listCategories?.map((item: ICategory) => {
    return listCategoriesSelect.push({ name: item.name, value: item.slug })
  })

  let listProductsSelect: ({ name: string; value: string; })[] = []

  listProducts?.map((item: IProduct) => {
    return listProductsSelect.push({ name: item.name, value: item.slug })
  })

  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Array<string>>([]);
  const [category, setCategory] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [loadingFile, setLoadingFile] = useState<boolean>(false)

  const { mutateAsync, isLoading } = useCreateImage()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!marca) throw "Não foi possível selecionar a marca"

    const categoria = listCategories?.find(item => item.slug = category)
    const produto = listProducts?.find(item => item.slug = product)

    if (!categoria) throw "Não foi possível selecionar a categoria"
    if (!produto) throw "Não foi possível selecionar o produto"

    let upload = {
      url: "",
      ref: ""
    }

    if (file) {
      setLoadingFile(true)

      // @ts-ignore
      const storageFile: IFileStorage = await uploadImage(file) as IFileStorage

      upload.url = storageFile.url
      upload.ref = storageFile.fileName

      if (storageFile.url) {
        const image: IImage = {
          id: storageFile.fileName,
          name: extractString(data.get('name') as string),
          description: extractString(data.get('description') as string),
          year: extractString(data.get('year') as string),
          format: extractString(data.get('format') as string),
          validate: extractString(data.get('validate') as string),
          sku: extractString(data.get('sku') as string),
          tags,
          createdAt: new Date().toISOString(),
          createdBy: user,
          product: produto,
          marca,
          marcaSlug: marca.slug,
          mainImg: upload,
          category: categoria
        }

        mutateAsync(image).then(res => {
          console.log(res)
          setOpenSuccess("Imagem salva com sucesso")
        })
      } else {
        setOpenError("Algo de errado aconteceu. Tente novamente")
      }
      setLoadingFile(false)
    }
  }

  const handleSelecetedTags = (items: Array<string>) => {
    console.log("array", items)
    setTags(items)
  }

  return <Layout>
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
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
              required
              fullWidth
              id="format"
              label="Formato"
              name="format"
              autoFocus
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="sku"
              label="SKU"
              name="sku"
              autoFocus
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="validate"
              label="Validade"
              name="validate"
              type="date"
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
              setTags={handleSelecetedTags}
              fullWidth
              variant="outlined"
              id="tags"
              name="tags"
              placeholder="Tags"
              label="Tags"
              tags={tags}
            />
            <Select
              id="selectCategory"
              value={category}
              label="Selecione a categoria"
              onChange={(event) => setCategory(event.target.value as string)}
              listData={listCategoriesSelect}
            />
            <Select
              id="selectProduct"
              value={product}
              label="Selecione o produto"
              onChange={(event) => setProduct(event.target.value as string)}
              listData={listProductsSelect}
            />

            <FileUploadInput onChange={(e) => {
              const fileList = e.target.files;

              if (!fileList) return;

              setFile(fileList[0]);
            }} multiple={false} />

            {file && <div style={{ width: '100%', padding: '8px 16px', border: `1px solid ${colors.grey[500]}`, borderRadius: 8, margin: '16px 0' }}><span>{file.name}</span></div>}

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