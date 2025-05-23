// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2C2C2C",
    },
    secondary: {
      main: "#A67EF5",
    },
    background: {
      default: "#FAFAFA",
    },
    text: {
      primary: "#1F1F1F",
      secondary: "#5F5F5F",
    },
  },
  typography: {
    fontFamily: "Poppins, Inter, sans-serif",
    h5: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#2C2C2C",
          color: "#F5F5F5",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: "20px",
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
