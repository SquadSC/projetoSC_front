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
    fontWeightThin: 100,
    fontWeightExtraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
    fontWeightBlack: 900,
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
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
