import { BrandContext, Layout } from "@components";
import { useGetArts, useGetCampaigns } from "@dataAccess";
import { Box, Grid, Loading, TextInput, Typography } from "@elements";
import SearchIcon from '@mui/icons-material/Search';
import { Masonry } from "@mui/lab";
import { Divider, IconButton, InputAdornment, List, ListItemButton, ListItemText, ListSubheader, Paper } from "@mui/material";
import { IArt, ICategory } from "@types";
import { extractString } from "@utils";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

interface MenuItemList {
  title: string,
  items?: IArt[],
  divider?: boolean
}

export const SearchArt = ({ params }: { params: { marca: string } }) => {

  const { selectedBrand: marca } = useContext(BrandContext)
  const [location, setLocation] = useLocation();

  if (!marca) setLocation("/marcas")

  const { data, isLoading } = useGetArts(marca?.slug || "")

  const { data: listCampaigns } = useGetCampaigns(marca?.slug || "")
  // const { data: listProducts } = useGetProducts(marca?.slug || "")

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<IArt[]>([])
  const [searchByList, setSearchByList] = useState<MenuItemList[]>([])

  const handleListItemClick = ({ title, items }: Omit<MenuItemList, 'divider'>) => {
    if (items) {
      setSelectedFilter(title)
      setSearchResult(items)
    }
  }

  const searchByText = (e: any) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget);

    const text = extractString(form.get('search') as string)

    const resultList: IArt[] = []
    if (data) {
      data.map((item) => {
        if (item.name.match(text) ||
          (item.observation && item.observation.match(text)) ||
          (item.tags && item.tags.includes(text))
        ) {
          resultList.push(item)
        }
      })
    }

    setSearchResult(resultList)
  }

  useEffect(() => {
    if (data) {
      handleListItemClick({ title: "Todos", items: data })
    }
  }, [data])

  useEffect(() => {
    let listLinks: MenuItemList[] = []

    if (data) {
      listLinks.push({ title: "Todos", items: data })

      listLinks.push({ title: "Campanhas", divider: true })
      listCampaigns?.forEach((category: ICategory) => {
        listLinks.push({ title: category.name, items: data.filter((item) => item.campaign?.slug === category.slug) })
      });

      listLinks.push({ title: "Tipo", divider: true })
      let uniqueTypes: string[] = []
      data.map(item => {
        uniqueTypes = [...new Set(data.map(item => item.type))]
      })
      uniqueTypes.forEach((type: string) => {
        listLinks.push({ title: type, items: data.filter((item) => item.type === type) })
      });

      listLinks.push({ title: "Ano", divider: true })
      let uniqueYears: string[] = []
      data.map(item => {
        uniqueYears = [...new Set(data.map(item => item.year))]
      })
      uniqueYears.forEach((year: string) => {
        listLinks.push({ title: year, items: data.filter((item) => item.year === year) })
      });

      listLinks.push({ title: "Avaliação", divider: true })
      listLinks.push({ title: "Aprovadas", items: data.filter((item) => typeof item.refusedBy === 'string') })
      listLinks.push({ title: "Reprovadas", items: data.filter((item) => typeof item.approvedBy === 'string') })
      listLinks.push({ title: "Sem avaliação", items: data.filter((item) => !item.approvedBy || !item.refusedBy) })

      setSearchByList(listLinks)
    }
  }, [data, listCampaigns])

  const Items = searchResult ? searchResult.map((item, index) => (
    <Link href={`/detalhe-arte/${marca?.slug}/${item.id}`} key={index}>
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
  )) : <Loading />

  const SideList = () => {
    return <Paper elevation={3} sx={{ width: "100%", height: "100%", borderRadius: 2, padding: 2, background: "linear-gradient(142deg, #fefefe 0%, #f0f0f0 100%)" }}>
      <Box display="flex" alignItems="center" justifyContent={"center"} gap={1} >
        <Typography component="h6" fontWeight="medium">
          Busca de imagens
        </Typography>
      </Box>
      <Divider
      />
      <Box component="form" onSubmit={searchByText} >
        <TextInput
          margin="normal"
          fullWidth
          name="search"
          label="Buscar"
          type="text"
          id="search"
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                edge="end"
                type="submit"
              >
                <SearchIcon />
              </IconButton></InputAdornment>,
          }}
        />
      </Box>

      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {searchByList.map((item, i) => {
          if (item.divider) {
            return <span key={i}>
              <ListSubheader sx={{ lineHeight: "28px", fontSize: "0.7rem", backgroundColor: "transparent" }}>
                {item.title}
              </ListSubheader>
              <Divider />
            </span>
          }

          if (item.items) {
            return <ListItemButton
              key={i}
              selected={selectedFilter == item.title}
              onClick={() => handleListItemClick(item)}
            >
              <ListItemText primary={item.title} secondary={item.items.length} />
            </ListItemButton>
          }
        })}
      </List>
    </Paper>
  }

  return <Layout title="Busca de imagens" params={params} sx={{ paddingY: 3 }} width="100%">
    <Grid container marginY={2}>
      <Grid item xs={3}>
        <SideList />
      </Grid>
      <Grid item xs={9}>
        <Grid container padding={2}>
          {isLoading || searchResult.length < 1 ? <Loading /> :
            <Masonry columns={3} spacing={2}>
              {Items}
            </Masonry>
          }
        </Grid>
      </Grid>
    </Grid>
  </Layout >

}