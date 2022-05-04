import { createTheme, ThemeOptions } from '@mui/material';

const defaultTheme: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: 'Raleway',
    },
    fontFamily: 'Open Sans',
    h2: {
      fontFamily: 'Raleway',
    },
    h3: {
      fontFamily: 'Raleway',
    },
    subtitle1: {
      fontFamily: 'Raleway',
    },
    button: {
      fontFamily: 'Raleway',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
}

export const themeOptionsDark: ThemeOptions = {
  ...defaultTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#586f7c',
    },
    secondary: {
      main: '#b8dbd9',
    },
  },
};

export const themeOptionsLight: ThemeOptions = {
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#044F72',
    },
    secondary: {
      main: '#586f7c',
    },
  },
};

export const theme = createTheme(themeOptionsLight);
