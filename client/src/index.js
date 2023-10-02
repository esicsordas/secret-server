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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorContextProvider>
    <RouterProvider router={router} />
    </ErrorContextProvider>
  </React.StrictMode>
);

reportWebVitals();