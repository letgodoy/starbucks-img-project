import { Box, Button, Grid, Link, TextInput, Typography } from "@elements";
import React, { ReactNode } from "react";
import { useLogIn } from "@dataAccess";
import { extractString } from "@utils";
import { ICredentials } from "@types";

export const Login = () => {

    const { mutateAsync, isLoading } = useLogIn();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const credentials: ICredentials = {
            email: extractString(data.get('email') as string),
            password: extractString(data.get('password') as string),
        }

        await mutateAsync(credentials)
    }

    return <Grid container sx={{ height: '100vh' }}>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t: any) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5}
            // component={Paper} 
            // elevation={6} 
            square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    </Grid>
}
