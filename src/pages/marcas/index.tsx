import { useGetBrands } from "@dataAccess";
import { Grid, Link, Typography } from "@elements";
import ImageIcon from '@mui/icons-material/Image';
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export const Marcas = () => {

  const { data } = useGetBrands()
  console.log(data)

  const listBrands = data?.map(item => <Link href={"/home/" + item.slug} key={item.name}>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.name} />
    </ListItem>
  </Link>)

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
