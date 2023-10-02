import { Container, Typography, Paper } from"@mui/material";
import { useRouteError } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useError } from "../Context/ErrorContext";


const ErrorPage = ( ) => {
    const routeError = useRouteError();
    const { error } = useError();


    return (
    <Container sx={{ mt: 12, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <Header />
        <Paper sx={{ px: 4, py: 5, m: 2 , display:"flex", flexDirection:"column", alignItems:"center"}} elevation={4}>
        <Typography variant="h4" sx={{p: 5, color: "primary.error"}}>Sorry, an error occured:</Typography>
        <Typography variant="h5" sx={{p: 5}}>{  error || routeError?.statusText || routeError?.message }</Typography>
        </Paper>
        <Footer />
    </Container>
)
}

export default ErrorPage;