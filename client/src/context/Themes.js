import { createTheme, alpha } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
  shape: {
    borderRadius: 4, // Add this line
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#000000",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#000000",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: "#000000",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#000000",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#000000",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#000000",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#000000",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#000000",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#000000",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "#000000",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "#000000",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      textTransform: "uppercase",
      color: "#000000",
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#000000",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "rgb(22, 28, 36)",
      paper: "rgb(22, 28, 36)",
    },
    text: {
      primary: "#ffffff",
    },
  },
  shape: {
    borderRadius: 4, // Add this line
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#ffffff",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#ffffff",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#ffffff",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#ffffff",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "#ffffff",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "#ffffff",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      textTransform: "uppercase",
      color: "#ffffff",
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#ffffff",
    },
  },
});
