// Theme configuration for MUI
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#38090D',
    },
    secondary: {
      main: '#F4E1D7',
    },
    tertiary: {
      main: '#FCF7F7',
    },
    background: {
      default: '#FCF7F7',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    // -- Font Weights --
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
    // -- Font Sizes --
    title: {
      fontSize: '3rem',
    },
    subTitle: {
      fontSize: '1.5rem',
    },
    subTitleLittle: {
      fontSize: '1rem',
    },
    text: {
      fontSize: '0.875rem',
    },
    textLittle: {
      fontSize: '0.75rem',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 90,
          textTransform: 'none',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    // ...outros overrides
  },
});

export default theme;
