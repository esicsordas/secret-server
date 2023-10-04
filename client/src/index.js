import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App.js"
import AddNewSecretPage from "./Pages/AddNewSecretPage.jsx"
import GetASecretPage from "./Pages/GetASecretPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import { ErrorContextProvider } from "./Context/ErrorContext.jsx";
import { ThemeProvider, theme } from "./theme.js"

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
        element: <GetASecretPage />,
      },
      {
        path: "/error",
        element: <ErrorPage />
      }
    ]
  },
])


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