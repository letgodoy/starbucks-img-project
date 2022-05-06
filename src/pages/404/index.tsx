import Logo from "@assets/southrock_preto_1.png";
import { Box, Button, Grid, Typography } from "@elements";
import Background from "@assets/img_southrock_6.png"

export const Error404 = () => {

    return <Grid container={true} sx={{ height: '100vh' }}>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            lg={6}
            sx={{
                backgroundImage: `url(${Background})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t: any) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} lg={6}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img
                    src={Logo}
                    alt="Logo Southrock"
                    loading="lazy"
                    width="50%"
                />
                <Typography variant="h4" component="h2" align="center" marginY={4}>
                    Pagina não encontrada
                </Typography>
                <Button href="/login">Ir para login</Button>

                <Button href="/marcas" sx={{ marginTop: 4 }}>Simular login</Button>
            </Box>
        </Grid>
    </Grid>
}
