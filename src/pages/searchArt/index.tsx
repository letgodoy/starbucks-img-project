import { BrandContext, Layout } from "@components";
import { useGetArts, useGetCategories, useGetProducts } from "@dataAccess";
import { Box, Grid, Typography } from "@elements";
import { Masonry } from "@mui/lab";
import { Divider, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { ICategory, IArt, IProduct } from "@types";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export const SearchArt = ({ params }: { params: { marca: string } }) => {

  const { selectedBrand: marca } = useContext(BrandContext)
  const [location, setLocation] = useLocation();

  if (!marca) setLocation("/marcas")

  const { data } = useGetArts(marca?.slug || "")

  // const { data: listCategories } = useGetCategories(marca?.slug || "")
  // const { data: listProducts } = useGetProducts(marca?.slug || "")

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<IArt[]>([])
  const [searchByList, setSearchByList] = useState<{ title: string, items: IArt[] }[]>([])

  const handleListItemClick = ({ title, items }: { title: string, items: IArt[] }) => {
    setSelectedFilter(title)
    setSearchResult(items)
  }

  useEffect(() => {
    if (data) {
      handleListItemClick({ title: "Todos", items: data })
    }
  }, [])

  useEffect(() => {
    let listLinks: { title: string, items: IArt[] }[] = []
    if (data) {
      listLinks.push({ title: "Todos", items: data })
      // listCategories?.forEach((category: ICategory) => {
      //   listLinks.push({ title: category.name, items: data.filter((item: any) => item.category?.slug === category.slug) })
      // });
      // listProducts?.forEach((product: IProduct) => {
      //   listLinks.push({ title: product.name, items: data.filter((item: any) => item.product?.slug === product.slug) })
      // });

      setSearchByList(listLinks)
    }
  }, [data])

  const Items = searchResult?.map((item, index) => (
    <Link href={`/detalhe-arte/${marca}/${item.id}`} key={index}>
      <div>
        <img
          src={item.images[0].url}
          alt={item.images[0].ref}
          loading="lazy"
          style={{
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            display: 'block',
            width: '100%',
          }}
        />
      </div>
    </Link>
  ))

  const SideList = () => {
    return <Paper elevation={3} sx={{ width: "100%", height: "100%", borderRadius: 2, padding: 2, background: "linear-gradient(142deg, #fefefe 0%, #f0f0f0 100%)" }}>
      <Box display="flex" alignItems="center" justifyContent={"center"} gap={1} >
        <Typography component="h6" fontWeight="medium">
          Busca de artes
        </Typography>
      </Box>
      <Divider
      />
      <List component="nav" aria-label="main mailbox folders">
        {searchByList?.map((item, i) => {
          return <ListItemButton
            key={i}
            selected={selectedFilter == item.title}
            onClick={() => handleListItemClick(item)}
          >
            <ListItemText primary={item.title} secondary={item.items.length} />
          </ListItemButton>
        })}
      </List>
    </Paper>
  }

  return <Layout title="Busca de artes" params={params} sx={{ paddingY: 3 }} width="100%">
    <Grid container marginY={2}>
      <Grid item xs={3}>
        <SideList />
      </Grid>
      <Grid item xs={9}>
        <Grid container padding={2}>
          <Masonry columns={3} spacing={2}>
            <>{Items}</>
          </Masonry>
        </Grid>
      </Grid>
    </Grid>
  </Layout >

}