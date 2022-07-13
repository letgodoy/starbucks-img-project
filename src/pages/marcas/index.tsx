import { BrandContext } from "@components";
import { useGetBrands } from "@dataAccess";
import { Grid, Typography } from "@elements";
import ImageIcon from '@mui/icons-material/Image';
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { IBrand } from "@types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Marcas = () => {

  const { setBrand } = useContext(BrandContext)

  const navigate = useNavigate();

  const { data } = useGetBrands()

  const handleSelectBrand = (marca: IBrand) => {

    setBrand(marca)
    navigate("/home/" + marca.slug)

  }

  const listBrands = data?.map((item) => <ListItem key={item.name} onClick={() => handleSelectBrand(item as IBrand)}>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={item.name} />
  </ListItem>)

  return <Grid container width={"100%"} justifyContent={"center"} alignItems={"center"}>
    <Grid item padding={4} justifyContent={"center"} alignItems={"center"} sm={10} md={6} lg={4} textAlign={"center"}>
      <Typography component="h3" variant="h4" marginY={4}>
        Selecione a marca
      </Typography>
      <List sx={{ width: '100%' }}>
        {listBrands}
      </List>
    </Grid>
  </Grid>
}
