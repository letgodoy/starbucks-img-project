import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { useCreateOrder, useGetArts } from "@dataAccess";
import { Box, Button, Grid, Typography } from "@elements";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { IArt, IOrder, IOrderArt } from "@types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Orders = () => {

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user, store } = useContext(AuthContext)

  const [selectedArts, setSelectedArts] = useState<Array<IOrderArt>>([])

  checkBrand()

  const navigate = useNavigate();

  const { data, isLoading } = useGetArts(marca?.slug || "")

  const { mutateAsync, isLoading: saving, data: result } = useCreateOrder()

  const [rows, setRows] = useState<IArt[]>([])

  useEffect(() => {
    if (data) {
      setRows(data?.filter((item) => {
        // if (item.approvedBy && typeof item.approvedBy !== 'string') {
        return item
        // }
      }))
    }
  }, [data])

  useEffect(() => {
    if (result) navigate(`/pedido/${marca}/cart/${result.id}`)
  }, [result])

  const columns: GridColDef[] = [
    {
      field: 'images', headerName: 'Imagem', width: 130, renderCell: (params: GridRenderCellParams) => <img
        src={params.row.images[0].url}
        alt={params.row.images[0].ref}
        loading="lazy"
        style={{
          height: "100%"
        }}
      />
    },
    { field: 'name', headerName: 'Nome', width: 130, filterable: true },
    { field: 'type', headerName: 'Tipo', width: 130, filterable: true },
    { field: 'campaign', headerName: 'Campanha', width: 130, valueGetter: (params: GridValueGetterParams) => `${params.row.campaign.name}`, filterable: true },
    { field: 'year', headerName: 'Year', width: 130, filterable: true },
    { field: 'format', headerName: 'Formato', width: 130, filterable: true },
    { field: 'specification', headerName: 'Especificação', width: 130, filterable: true },
    { field: 'tags', headerName: 'Tags', width: 130, filterable: true },
    { field: 'id', headerName: 'ID', width: 70 },
  ];

  const handleSelectedArts = (ids: Array<any>) => {

    const arts: IOrderArt[] = []

    ids.map((id) => {
      data?.filter((item: IArt) => {
        if (item.id === id) {
          arts.push({
            art: item,
            qnt: 1
          })
        }
      })
    })

    setSelectedArts(arts)
  }

  const createOrder = (event: any) => {
    event.preventDefault()

    try {

      if (!marca) throw "Não foi possível selecionar a marca"
      if (!store) throw "Não foi possível selecionar a loja"

      if (selectedArts.length > 0) {
        const order: IOrder = {
          id: uuidv4(),
          arts: selectedArts,
          createdAt: new Date().toISOString(),
          createdBy: user,
          marca,
          marcaSlug: marca.slug,
          store,
          isClosed: false
        }


        mutateAsync(order).then((res: any) => {
          setOpenSuccess("Pedido criado com sucesso.")
        }).catch((error: string) => {
          console.warn("erro: " + error)
          throw "Erro ao salvar. Tente novamente."
        })
      } else {
        throw "Selecione quais artes deseja pedir."
      }
    } catch (e) {
      setOpenError(e as string)
    }
  }

  return <Layout title="Pedido" sx={{ paddingY: 3 }} width="100%">
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
        <Typography component="h1" variant="h5">
          Faça seu pedido
        </Typography>
        <Typography component="p">
          Selecione quais artes deseja fazer o pedido.
        </Typography>
      </Box>
      <Box width="100%" height='70vh' paddingY={2}>
        <DataGrid
          loading={rows.length === 0 || isLoading}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(e) => handleSelectedArts(e)}
        />
      </Box>
      <Box width="100%" paddingY={2}>
        <Button onClick={(e) => createOrder(e)} >Salvar</Button>
      </Box>
    </Grid>
  </Layout >
}