import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { useCreateOrder, useGetOrderByIDAsync } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { IOrder, IOrderArt } from "@types";
import { extractString } from "@utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Cart = () => {

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  checkBrand()

  const navigate = useNavigate();

  const params = useParams();

  const { mutateAsync: getOrder, data, isLoading } = useGetOrderByIDAsync()
  const { mutateAsync: updateOrder, isLoading: saving, data: result } = useCreateOrder()

  const [rows, setRows] = useState<IOrderArt[]>([])
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    if (data) {
      setRows(data.arts)
    }
  }, [data])

  useEffect(() => {
    if (params.id) {
      getOrder(params.id)
    }
  }, [params])

  useEffect(() => {
    if (result) navigate(`/pedido/${marca}/lista`)
  }, [result])

  const handleDeleteClick = (event: any, id: string) => {
    event.preventDefault()

    const newArts = rows.filter((item: IOrderArt) => {
      return item.art.id !== id && item
    })

    setRows(newArts)
  }

  const handleEditCell = (event: any, field: string, item: IOrderArt) => {
    event.preventDefault()

    const value: string | null | undefined = extractString(event.target.value)

    const rowsEdited = rows.map((row: IOrderArt) => {
      if (item === row) {
        if (field === "qnt") {
          row.qnt = parseInt(value || "0")
        } else if (field === "observation") {
          row.observation = value
        }
      }

      return row
    })

    setRows(rowsEdited)
  }

  const saveOrder = (event: any) => {
    event.preventDefault()

    try {
      const order: IOrder = {
        ...data as IOrder,
        arts: rows,
        isClosed: true
      }

      updateOrder(order).then((res: any) => {
        setOpenSuccess("Pedido realizado com sucesso.")
      }).catch((error: string) => {
        console.warn("erro: " + error)
        throw "Erro ao salvar. Tente novamente."
      })
    } catch (e) {
      setOpenError(e as string)
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'images', headerName: 'Imagem', width: 130, renderCell: (params: GridRenderCellParams) => <img
        src={params.row.art.images[0].url}
        alt={params.row.art.images[0].ref}
        loading="lazy"
        style={{
          height: "100%"
        }}
      />
    },
    {
      field: 'name', headerName: 'Nome', width: 130, filterable: true, valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.art.name}`
      },
    },
    {
      field: 'qnt', headerName: 'Quantidade', width: 100, filterable: true, renderCell: (params: GridRenderCellParams) => {
        if (isEditable) {
          return <TextInput
            fullWidth
            id="qnt"
            label="Quantidade"
            name="qnt"
            variant="standard"
            type="number"
            defaultValue={params.row.qnt}
            onChange={(e) => handleEditCell(e, params.field, params.row)}
          />
        }

        return params.row.qnt
      }
    },
    {
      field: 'observation', headerName: 'Observação', width: 160, filterable: true, renderCell: (params: GridRenderCellParams) => {
        if (isEditable) {
          return <TextInput
            fullWidth
            id="observation"
            label="Observação"
            name="observation"
            variant="standard"
            defaultValue={params.row.observation}
            onChange={(e) => handleEditCell(e, params.field, params.row)}
          />
        }

        return params.row.observation
      }
    },
    {
      field: 'delete', headerName: 'Remover', width: 80, renderCell: (params: GridRenderCellParams) => <Button
        onClick={(e) => handleDeleteClick(e, params.row.art.id)}
        variant="text"
      ><DeleteIcon /></Button>,
    },
  ];

  return <Layout title="Pedido" sx={{ paddingY: 3 }} width="100%">
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
        <Typography component="h1" variant="h5">
          Confira seu pedido
        </Typography>
        <Typography component="p">
          Confira, altere as quantidades e adicione observações antes de fechar o pedido.
        </Typography>
      </Box>
      <Box width="100%" height='70vh' paddingY={2}>
        <DataGrid
          loading={rows.length === 0 || isLoading}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.art.id}
        />
      </Box>
      <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
        <Button onClick={() => setIsEditable(!isEditable)} color="secondary">Editar</Button>
        <Button onClick={(e) => saveOrder(e)}>Finalizar</Button>
      </Box>
    </Grid>
  </Layout >
}