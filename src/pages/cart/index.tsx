import { AlertContext, AuthContext, BrandContext, Layout } from "@components";
import { useGetOrderByIDAsync } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { IOrderArt } from "@types";
import { verifyBrand } from "@utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

export const Cart = () => {

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user, store } = useContext(AuthContext)

  verifyBrand()

  const navigate = useNavigate();

  if (!marca) navigate("/marcas")

  const params = useParams();

  const { mutateAsync, data, isLoading } = useGetOrderByIDAsync()

  const [rows, setRows] = useState<IOrderArt[]>([])
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    if (data) {
      setRows(data.arts)
    }
  }, [data])

  useEffect(() => {
    if (params.id) {
      mutateAsync(params.id)
    }
  }, [params])

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
        />
        }

        return params.row.qnt
      }
    },
    { field: 'observation', headerName: 'Observação', width: 160, filterable: true, renderCell: (params: GridRenderCellParams) => {
      if (isEditable) {
        return <TextInput
        fullWidth
        id="observation"
        label="Observação"
        name="observation"
        variant="standard"
      />
      }

      return params.row.observation
    } },
    {
      field: 'edit', headerName: 'Editar', width: 80, renderCell: (params: GridRenderCellParams) => <Button
        onClick={() => setIsEditable(!isEditable)}
        variant="text"
      ><EditIcon /></Button>,
    },
    {
      field: 'delete', headerName: 'Remover', width: 80, renderCell: (params: GridRenderCellParams) => <Button
        // onClick={handleDeleteClick(id)}
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
      <Box width="100%" paddingY={2}>
        {/* <Button onClick={(e) => createOrder(e)} >Salvar</Button> */}
      </Box>
    </Grid>
  </Layout >
}