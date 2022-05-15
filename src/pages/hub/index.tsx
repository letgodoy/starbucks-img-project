import { AuthContext } from "@components";
import { Box, Button, Grid, Typography } from "@elements";
import { hubList } from "@utils";
import { useContext } from "react";

export const Hub = () => {

  const { user } = useContext(AuthContext)

  const listLinks = hubList?.map((item) => <Button key={item.name} href={item.link} sx={{
    margin: 3,
    width: "300px",
    height: "80px"
  }}>
    {item.name}
  </Button>)

  return <Grid container width={"100%"} justifyContent={"center"} alignItems={"center"}>
    <Grid item padding={4} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
      <Typography component="h3" variant="h4" marginY={4}>
        Bem vindo, {user.name}
      </Typography>
      <Box sx={{ width: '100%', display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {listLinks}
      </Box>
    </Grid>
  </Grid>
}
