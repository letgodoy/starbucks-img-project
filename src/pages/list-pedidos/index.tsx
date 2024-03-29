import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { useCreateOrder, useGetOrders, useGetProviders } from "@dataAccess";
import { Box, Button, Grid, Typography } from "@elements";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Modal, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { IOrder, IProvider } from "@types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ListOrders = () => {
  checkBrand()

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const params = useParams();

  const { data, isLoading } = useGetOrders(marca?.slug || params?.marca || "")
  const { mutateAsync: updateOrder, isLoading: saving, data: result } = useCreateOrder()
  const { data: allProviders, isLoading: loadingProviders } = useGetProviders()

  const [rows, setRows] = useState<Array<IOrder>>([])
  const [showAll, setShowAll] = useState(false)
  const [showProduction, setShowProduction] = useState(false)
  const [selectProvider, setSelectProvider] = useState<IProvider>()
  const [openProviders, setOpenProviders] = useState(false);

  useEffect(() => {
    if (data) {
      showOrders()
    }
  }, [data])

  useEffect(() => {
    if (result) navigate(`/pedido/${marca?.slug}/lista`)
  }, [result])

  const showAllOrders = (e: any) => {
    e.preventDefault()
    setRows(data || [])
    setShowAll(true)
  }

  const showOrders = (e?: any) => {
    e && e.preventDefault()
    const finishedOrders = data?.filter((order) => {
      return order.isClosed && order
    })

    setRows(finishedOrders || [])
    setShowAll(false)
  }

  const showProductionOrders = (e?: any) => {
    e && e.preventDefault()
    const productionOrders = data?.filter((order) => {
      if (typeof order.toProduction === "object" && order.isClosed === true) return order
    })

    setRows(productionOrders || [])
    setShowProduction(true)
  }

  const showNotProductionOrders = (e?: any) => {
    e && e.preventDefault()
    showOrders()
    setShowProduction(false)
  }

  const saveOrder = (order: IOrder) => {
    try {
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

  const approveOrder = (e: any, row: IOrder, action: string) => {
    e.preventDefault()

    let order: IOrder = row

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

  const productOrder = (e: any, row?: IOrder) => {
    e.preventDefault()

    if (!selectProvider) {
      setOpenError("Selecione um fornecedor")
    } else {
      const order: IOrder = {
        ...row as IOrder,
        toProduction: {
          date: new Date().toISOString(),
          provider: selectProvider,
          by: user
        }
      }

      saveOrder(order)
    }
  }

  const handleSelectedProvider = (ids: Array<any>) => {

    const provider: IProvider[] = []

    allProviders?.filter((item) => {
      if (item.cnpj === ids[0]) {
        provider.push(item as IProvider)
      }
    })

    setSelectProvider(provider[0])
  }

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: 'ID', minWidth: 100, filterable: true
    },
    {
      field: 'createdAt', headerName: 'Data de criação', minWidth: 170, filterable: true, valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.createdAt).toLocaleString()}`
    },
    {
      field: 'createdBy', headerName: 'Solicitante', minWidth: 180, filterable: true, valueGetter: (params: GridValueGetterParams) =>
        `${params.row.createdBy.name}`
    },
    {
      field: 'store', headerName: 'Loja', minWidth: 150, filterable: true, valueGetter: (params: GridValueGetterParams) =>
        `${params.row.store.name}`
    },
    {
      field: 'arts', headerName: 'Total de artes', width: 110, type: 'number', filterable: true, valueGetter: (params: GridValueGetterParams) =>
        `${params.row.arts.length}`
    },
    {
      field: 'details', headerName: 'Ver pedido', width: 90, filterable: true, align: "center", renderCell: (params: GridRenderCellParams) => {
        return <Tooltip title="Ver detalhes do pedido" arrow>
          <IconButton
            onClick={() => navigate(`/pedido/${marca?.slug}/${params.row.id}`)}
          ><VisibilityIcon /></IconButton>
        </Tooltip>
      }
    },
    {
      field: 'approve', headerName: 'Aprovar pedido', width: 120, filterable: true, align: "center", renderCell: (params: GridRenderCellParams) => {
        if (params.row.approvedBy === undefined && params.row.refusedBy === undefined && params.row.isClosed) {
          return <>
            <Tooltip title="Aprovar pedido" arrow>
              <IconButton
                onClick={(e) => approveOrder(e, params.row, "approve")}
              ><CheckIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Recusar pedido" arrow>
              <IconButton
                onClick={(e) => approveOrder(e, params.row, "refuse")}
              ><CloseIcon /></IconButton>
            </Tooltip>
          </>
        } else if (typeof params.row.approvedBy === "object" && typeof params.row.refusedBy === "string" && params.row.isClosed) {
          return <Tooltip title={`Aprovado por ${params.row.approvedBy.name}`} arrow>
            <CheckIcon />
          </Tooltip>
        } else if (typeof params.row.approvedBy === "string" && typeof params.row.refusedBy === "object" && params.row.isClosed) {
          return <Tooltip title={`Recusado por ${params.row.refusedBy.name}`} arrow>
            <CloseIcon />
          </Tooltip>
        }

        return null
      }
    },
    {
      field: 'toProduction', headerName: 'Enviado p/ produção', minWidth: 150, filterable: true, align: "center", renderCell: (params: GridRenderCellParams) => {
        if (params.row.toProduction) {
          return <Tooltip title="Pedido enviado" arrow><TaskIcon /></Tooltip>
        } else if (!params.row.toProduction && params.row.isClosed === true && typeof params.row.approvedBy === "object") {
          return <Tooltip title="Enviar pedido" arrow>
            <IconButton
              onClick={(e) => productOrder(e, params.row)}
            ><DriveFolderUploadIcon /></IconButton>
          </Tooltip>
        }

        return null
      }
    },
  ];

  const columnsProviders: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 250, filterable: true },
    { field: 'cnpj', headerName: 'CNPJ', width: 150, filterable: true },
    { field: 'manager', headerName: 'Gerente', width: 150, filterable: true },
    {
      field: 'address', headerName: 'Endereço', width: 380, filterable: true, valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.address.logradouro}, ${params.row.address.numero} - ${params.row.address.localidade} - ${params.row.address.uf}`
      },
    },
    { field: 'managerPhone', headerName: 'Contato do gerente', width: 150, filterable: true },
    { field: 'managerEmail', headerName: 'E-mail do gerente', width: 250, filterable: true },
    { field: 'productionEmail', headerName: 'E-mail para produção', width: 250, filterable: true },
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

  return <Layout title="Pedido" sx={{ paddingY: 3 }} width="100%">
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
        <Typography component="h1" variant="h5">
          Pedidos
        </Typography>
      </Box>
      <Box width="100%" paddingY={2} display="inline-flex" gap={2} justifyContent="flex-end">
        {showAll ? <Button onClick={(e) => showOrders(e)} variant="text">Exibir apenas pedidos finalizados</Button> : <Button onClick={(e) => showAllOrders(e)} variant="text">Exibir pedidos não finalizados</Button>}
        {showProduction ? <Button onClick={(e) => showNotProductionOrders(e)} variant="text">Exibir não enviados para produção</Button> : <Button onClick={(e) => showProductionOrders(e)} variant="text">Exibir enviados para produção</Button>}
      </Box>
      <Box width="100%" height='70vh' paddingY={2}>
        <DataGrid
          loading={isLoading}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Modal
        open={openProviders}
        onClose={() => setOpenProviders(false)}
        aria-labelledby="Selecione o fornecedor"
        title="Selecione o fornecedor"
      >
        <Box sx={styleModal} paper={2}>
          <Grid container>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
              <Typography component="h1" variant="h5">
                Selecione apenas 1 fornecedor
              </Typography>
            </Box>
            <Box width="100%" height='70vh' paddingY={2}>
              <DataGrid
                loading={loadingProviders}
                rows={allProviders || []}
                columns={columnsProviders}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.cnpj}
                onSelectionModelChange={(e) => handleSelectedProvider(e)}
              />
            </Box>
            <Box width="100%" paddingY={2}>
              <Button variant="outlined" sx={{marginX: "1rem"}} onClick={() => setOpenProviders(false)}>Cancelar</Button>
              <Button onClick={(e) => productOrder(e)}>Enviar</Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  </Layout >
}