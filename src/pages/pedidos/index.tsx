import { BrandContext, Layout } from "@components";
import { useGetArts } from "@dataAccess";
import { Box, Grid, Typography } from "@elements";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { IArt } from "@types";
import { verifyBrand } from "@utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Orders = () => {

  const { selectedBrand: marca } = useContext(BrandContext)

  verifyBrand()

  const navigate = useNavigate();

  if (!marca) navigate("/marcas")

  const { data, isLoading } = useGetArts(marca?.slug || "")

  const [rows, setRows] = useState<IArt[]>([])

  useEffect(() => {
    if (data) {
      setRows(data?.filter((item) => {
        if (item.approvedBy && typeof item.approvedBy !== 'string') {
          return item
        }
      }))
    }
  }, [data])

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
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Grid>
  </Layout >
}