import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D7CF0",
      light: "#E6F4F1",
      dark: "#0046AF",
      contrastText: "#FFFFFF",
      error: "#E9400F"
    },
  },
  typography: {
    fontFamily: "PT Serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})



export { theme, ThemeProvider };
