import Background from "@assets/img_southrock_7.png";
import Logo from "@assets/southrock_preto_1.png";
import { AlertContext, AuthContext } from "@components";
import { findAgencyByID, findStoreByID, findUserByID, useGetUserByID, useLogIn } from "@dataAccess";
import { Box, Button, Grid, TextInput } from "@elements";
import { IAgency, ICredentials, IStore, IUser } from "@types";
import { extractString } from "@utils";
import React, { useContext } from "react";
import { useLocation } from "wouter";

export const Login = () => {
    const [location, setLocation] = useLocation();

    const { mutateAsync, isLoading } = useLogIn();

    const { isLoading: isLoadingUser, mutateAsync: mutateAsyncUser } = useGetUserByID();

    const { user, setUser, setToken, setAgency, setStore } =
        useContext(AuthContext);

    const { setOpenSuccess, setOpenError } = useContext(AlertContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const credentials: ICredentials = {
            email: extractString(data.get('email') as string),
            password: extractString(data.get('password') as string),
        }

        mutateAsync(credentials).then(async res => {
            const { stsTokenManager } = res as any;

            setToken(stsTokenManager);

            await findUserByID(res.uid).then(async (userFind) => {
                setUser(userFind as IUser);

                if (userFind.agency) {
                    await findAgencyByID(userFind.agency).then((agency) => {
                        setAgency(agency as IAgency);
                    });
                }

                if (userFind.store) {
                    await findStoreByID(userFind.store).then((store) => {
                        setStore(store as IStore);
                    });
                }

                setOpenSuccess(`Bem vindo ${userFind.name}`);
            });
            setLocation("/marcas")
        })

    }

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
                    width="30%"
                />
                <Box component="form" onSubmit={handleSubmit} marginY={5}>
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid> */}
                </Box>
            </Box>
        </Grid>
    </Grid>
}
function setToken(stsTokenManager: any) {
    throw new Error("Function not implemented.");
}

