import { Container, Typography } from"@mui/material";
import { useRouteError } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useError } from "../Context/ErrorContext";


const ErrorPage = ( ) => {
    const routeError = useRouteError();
    const { error } = useError();


    return (
    <Container id="error-page">
        <Header />
        <Typography>Sorry, an unexpected error occured:</Typography>
        <Typography>{  error || routeError.statusText || routeError.message }</Typography>
        <Footer />
    </Container>
)
}

export default ErrorPage;