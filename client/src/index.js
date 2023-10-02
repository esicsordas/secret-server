import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.js"
import AddNewSecretPage from "./Pages/AddNewSecretPage.jsx"
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import GetASecretPage from "./Pages/GetASecretPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import { ErrorContextProvider } from "./Context/ErrorContext.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/add-new-secret",
        element: <AddNewSecretPage />,
      },
      {
        path: "/get-a-secret",
        element: <GetASecretPage/>,
      },
      {
        path: "/error",
        element: <ErrorPage />
      }
    ]
  },
])

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
  typography : {
    fontFamily : "PT Serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <ErrorContextProvider>
    <RouterProvider router={router} />
    </ErrorContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();