import { Container, Typography } from"@mui/material";
import { useRouteError } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const ErrorPage = ( ) => {
    const error = useRouteError();
    console.error(error)

return (
    <Container id="error-page">
        <Header />
        <Typography>Sorry, an unexpected error occured:</Typography>
        <Typography>{error.statusText || error.message}</Typography>
        <Footer />
    </Container>
)
}

export default ErrorPage;