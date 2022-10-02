import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { useCreateOrder, useGetArts, useGetOrderByIDAsync } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton, Modal, Paper, Stack, styled, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { IArt, IOrder, IOrderArt, IUser } from "@types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { extractString } from "../../utils";

export const OrderDetail = () => {

  checkBrand()

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const params = useParams();

  const { data: allArts, isLoading } = useGetArts(marca?.slug || params?.marca || "")
  const { mutateAsync: getOrder, data, isLoading: loadingOrder } = useGetOrderByIDAsync()
  const { mutateAsync, isLoading: saving, data: result } = useCreateOrder()


  const [rows, setRows] = useState<Array<IOrderArt>>([])
  const [rowsArts, setRowsArts] = useState<IArt[]>([])
  const [isEditable, setIsEditable] = useState(false)
  const [open, setOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(true)
  const [status, setStatus] = useState<{
    status?: string,
    user?: IUser,
    production?: any
  }>({})

  useEffect(() => {
    if (data) {
      setRows(data.arts)

      if (!data.isClosed) {
        setIsFinished(false)
      } else {
        if (typeof data.approvedBy === "object") {
          setStatus({
            status: "Aprovado por: ",
            user: data.approvedBy,
            // production: data.toProduction
          })
        } else if (typeof data.refusedBy === "object") {
          setStatus({
            status: "Recusado por: ",
            user: data.refusedBy
          })
        }
      }
    }
  }, [data])

  useEffect(() => {
    if (allArts && data) {
      let allArtsList = allArts.filter((item) => {
        // if (item.approvedBy && typeof item.approvedBy !== 'string') {
        return !data.arts.some((art: IOrderArt) => {
          return art.art.id === item.id
        })
        // }
      })

      setRowsArts(allArtsList)
    }
  }, [allArts, data])

  useEffect(() => {
    if (params.id) {
      getOrder(params.id)
    }
  }, [params])

  useEffect(() => {
    if (result) navigate(`/pedido/${marca}/lista`)
  }, [result])

  const saveOrder = (order: IOrder) => {

    try {
      mutateAsync(order).then((res: any) => {
        setOpenSuccess("Pedido realizado com sucesso.")
      }).catch((error: string) => {
        console.warn("erro: " + error)
        throw "Erro ao salvar. Tente novamente."
      })
    } catch (e) {
      setOpenError(e as string)
    }
  }

  const handleSelectedArts = (ids: Array<any>) => {

    const arts: IOrderArt[] = []

    ids.map((id) => {
      allArts?.filter((item: IArt) => {
        if (item.id === id) {
          arts.push({
            art: item,
            qnt: 1
          })
        }
      })
    })

    setRows([...rows, ...arts])
  }

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

  const columnsArts: GridColDef[] = [
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

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const updateOrder = (e: any) => {
    e.preventDefault()

    const order: IOrder = {
      ...data as IOrder,
      arts: rows,
      isClosed: true
    }

    saveOrder(order)
  }

  const approveOrder = (e: any, action: string) => {
    e.preventDefault()

    let order: IOrder = data as IOrder

    if (action === "approve") {
      order = {
        ...order,
        approvedBy: user,
        refusedBy: "approved"
      }
    } else if (action === "refuse") {
      order = {
        ...order,
        refusedBy: user,
        approvedBy: "refused"
      }
    }

    saveOrder(order)
  }

  const productOrder = (e: any) => {
    e.preventDefault()

    const order: IOrder = {
      ...data as IOrder,
      toProduction: {
        date: new Date().toISOString(),
        by: user
      }
    }

    saveOrder(order)
  }

  return <Layout title="Pedido" sx={{ paddingY: 3 }} width="100%">
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
        <Typography component="h1" variant="h5">
          {isFinished ? "Detalhes do pedido" : "Editar seu pedido"}
        </Typography>
        <Stack
          direction={{ sm: 'column', md: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Item>Loja: {data?.store.name}</Item>
          <Item>Criado por: {data?.createdBy.name}</Item>
          <Item>Data: {new Date(data?.createdAt).toLocaleString("pt-BR")}</Item>
          {status.status && <Item>{status.status}{status.user?.name}</Item>}
          {status.production && <Item>Enviado p/ prod. em: {new Date(status.production.date).toLocaleString("pt-BR")}</Item>}
        </Stack>
      </Box>
      <Box width="100%" height='70vh' paddingY={2}>
        <DataGrid
          loading={loadingOrder}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.art.id}
          columnVisibilityModel={{
            delete: !isFinished,
          }}
        />
      </Box>
      {!isFinished ? <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
        <Button onClick={() => setOpen(true)} color="secondary">Adicionar artes</Button>
        <Button onClick={() => setIsEditable(!isEditable)} color="secondary">Editar</Button>
        <Button onClick={(e) => updateOrder(e)}>Finalizar</Button>
      </Box> : null}
      {isFinished && !status.status ? <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
        <Tooltip title="Aprovar pedido" arrow>
          <Button
            onClick={(e) => approveOrder(e, "approve")}
          >Aprovar</Button>
        </Tooltip>
        <Tooltip title="Recusar pedido" arrow>
          <Button
            onClick={(e) => approveOrder(e, "refuse")}
            variant="outlined"
          >Recusar</Button>
        </Tooltip>
      </Box> : null}
      {isFinished && !status.production && status.status === "Aprovado por: " ? <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
        <Tooltip title="Aprovar pedido" arrow>
          <Button
            onClick={(e) => productOrder(e)}
          >Enviar para produção</Button>
        </Tooltip>
      </Box> : null}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Selecione as artes para adicionar"
        title="Selecione as artes para adicionar"
      >
        <Box sx={styleModal} paper={2}>
          <Grid container>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
              <Typography component="h1" variant="h5">
                Selecione as artes para adicionar
              </Typography>
            </Box>
            <Box width="100%" height='70vh' paddingY={2}>
              <DataGrid
                loading={isLoading}
                rows={rowsArts}
                columns={columnsArts}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                onSelectionModelChange={(e) => handleSelectedArts(e)}
              />
            </Box>
            <Box width="100%" paddingY={2}>
              <Button onClick={() => setOpen(false)}>Concluído</Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  </Layout >
}