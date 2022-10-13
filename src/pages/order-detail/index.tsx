import { AlertContext, AuthContext, BrandContext, checkBrand, Layout } from "@components";
import { useCreateOrder, useGetArts, useGetOrderByIDAsync, useGetProviders } from "@dataAccess";
import { Box, Button, Grid, Loading, TextInput, Typography } from "@elements";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Modal, Paper, Stack, styled, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { IArt, IOrder, IOrderArt, IProvider, IUser } from "@types";
import { extractString } from "@utils";
import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const OrderDetail = () => {

  checkBrand()

  const { selectedBrand: marca } = useContext(BrandContext)
  const { setOpenSuccess, setOpenError } = useContext(AlertContext)
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const params = useParams();
  const [searchParams] = useSearchParams();

  const { data: allArts, isLoading } = useGetArts(marca?.slug || params?.marca || "")
  const { data: allProviders, isLoading: loadingProviders } = useGetProviders()
  const { mutateAsync: getOrder, data, isLoading: loadingOrder, } = useGetOrderByIDAsync()
  const { mutateAsync, isLoading: saving } = useCreateOrder()

  const [rows, setRows] = useState<Array<IOrderArt>>([])
  const [rowsArts, setRowsArts] = useState<IArt[]>([])
  const [isEditable, setIsEditable] = useState(false)
  const [open, setOpen] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);
  const [openPDFPreview, setOpenPDFPreview] = useState(false);
  const [isFinished, setIsFinished] = useState(true)
  const [isCarrinho, setIsCarrinho] = useState(false)
  const [selectProvider, setSelectProvider] = useState<IProvider>()
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
        if (item.approvedBy && typeof item.approvedBy !== 'string') {
          return !data.arts.some((art: IOrderArt) => {
            return art.art.id === item.id
          })
        }
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
    if (searchParams.get("carrinho") === "true" && isFinished === false) {
      setIsCarrinho(true)
    } else {
      setIsCarrinho(false)
    }
  }, [searchParams, isFinished])

  const saveOrder = (order: IOrder) => {

    try {
      mutateAsync(order).then(() => {
        setOpenSuccess("Pedido realizado com sucesso.")
        navigate(`/pedido/${marca?.slug}/lista`)
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

  const handleSelectedProvider = (ids: Array<any>) => {

    const provider: IProvider[] = []

    allProviders?.filter((item) => {
      if (item.cnpj === ids[0]) {
        provider.push(item as IProvider)
      }
    })

    setSelectProvider(provider[0])
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

  const printDocument = () => {
    //const input = document.getElementById('divToPrint');

    const doc = new jsPDF();

    //get table html
    const pdfPrint = document.getElementById('divToPrint');
    //html to pdf format
    let html = htmlToPdfmake(`${pdfPrint?.innerHTML}`);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();

  }

  const productOrder = (e: any) => {
    e.preventDefault()

    if (!selectProvider) {
      setOpenError("Selecione um fornecedor")
    } else {

      // criar pdf

      printDocument()

      // salva pdf

      // gerar zip

      // salva zip

      //manda email

      //salva que foi enviado
      const order: IOrder = {
        ...data as IOrder,
        toProduction: {
          date: new Date().toISOString(),
          provider: selectProvider,
          by: user
        }
      }

      saveOrder(order)
    }
  }

  if (isLoading) return <Loading />

  return <Layout title="Pedido" sx={{ paddingY: 3 }} width="100%">
    <Grid container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
        <Typography component="h1" variant="h5">
          {isFinished ? "Detalhes do pedido" : isCarrinho ? "Carrinho" : "Editar seu pedido"}
        </Typography>
        {isCarrinho ? null : <Stack
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
        </Stack>}
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
      {loadingOrder || saving ? <Loading /> : !isFinished ? <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
        <Button onClick={() => setOpen(true)} color="secondary">Adicionar artes</Button>
        <Button onClick={() => setIsEditable(!isEditable)} color="secondary">Editar</Button>
        <Button onClick={(e) => updateOrder(e)}>Finalizar</Button>
      </Box> : null}
      {loadingOrder || saving ? <Loading /> : isFinished && !status.status ? <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
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
      {loadingOrder || saving ? <Loading /> : isFinished && !status.production && status.status === "Aprovado por: " ? <Box width="100%" paddingY={2} gap={2} display="inline-flex" justifyContent={"end"}>
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
              <Button variant="outlined" sx={{ marginX: "1rem" }} onClick={() => setOpenProviders(false)}>Cancelar</Button>
              <Button onClick={(e) => productOrder(e)}>Enviar</Button>
            </Box>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openPDFPreview}
        onClose={() => setOpenPDFPreview(false)}
        aria-labelledby="Selecione o fornecedor"
        title="Selecione o fornecedor"
      >
        <Box sx={styleModal} paper={2}>
          <Grid container>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"} width="100%" gap={2} >
              <Typography component="h1" variant="h5">
                Revise seu pedido
              </Typography>
            </Box>
            <Box width="100%" height='70vh' paddingY={2} id="divToPrint">
              <div style={{ width: "100%", padding: "30px" }}>
                <h3 style={{ textAlign: "center" }}>
                  Pedido {data?.id}
                </h3>
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Loja: {data?.store.name}</p>
                    <p>Gerente: {data?.store.manager} - {data?.store.managerPhone}</p>
                    <p>Endereço: {data?.store.address.logradouro}, {data?.store.address.numero} - {data?.store.address.complemento}</p>
                    <p>{data?.store.address.bairro} - {data?.store.address.localidade} - {data?.store.address.uf}</p>
                  </div>
                  <div style={{ width: "50%", textAlign: "right" }}>
                    <p>Marca: {data?.marca.name}</p>
                    {/* {data?.marca.avatar ? <img src={data?.marca.avatar} alt={data?.marca.name} style={{ width: "100px" }} /> : null} */}
                    <p>Pedido por: {data?.createdBy.name}</p>
                    <p>Aprovado por: {data?.approvedBy.name}</p>
                    <p>Data de criação do pedido: {new Date(data?.createdAt).toLocaleString("pt-BR")}</p>
                    <p>Data do envio para produção: {new Date().toLocaleString("pt-BR")}</p>
                  </div>
                </div>
              </div>
              <div>
                <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse"}}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ border: "1px solid black"}}>Quantidade</th>
                      <th scope="col" style={{ border: "1px solid black"}}>Arte</th>
                      <th scope="col" style={{ border: "1px solid black"}}>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.arts.map((row: IOrderArt, i: Key | null | undefined) => {
                      return <tr key={i}>
                      <td data-title="Quantidade" style={{ border: "1px solid black", textAlign: "center"}}>{row.qnt}</td>
                      <td data-title="Arte" style={{ border: "1px solid black"}}>{row.art.name} - id: {row.art.id}</td>
                      <td data-title="Observação" style={{ border: "1px solid black"}}>{row.observation}</td>
                    </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </Box>
            <Box width="100%" paddingY={2}>
              <Button variant="outlined" sx={{ marginX: "1rem" }} onClick={() => setOpenPDFPreview(false)}>Cancelar</Button>
              <Button onClick={() => printDocument()}>Finalizar pedido</Button>
            </Box>
          </Grid>
        </Box>
      </Modal >
    </Grid >
  </Layout >
}