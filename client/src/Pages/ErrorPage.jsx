import { useRouteError, useNavigate } from "react-router-dom";
import { useError } from "../Context/ErrorContext";
import { Container, Typography, Paper, Button } from"@mui/material";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const ErrorPage = ( ) => {
    const routeError = useRouteError();
    const { error } = useError();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
    <Container sx={{ mt: 12, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <Header />
        <Paper sx={{ px: 4, py: 5, m: 2 , display:"flex", flexDirection:"column", alignItems:"center"}} elevation={4}>
        <Typography variant="h4" sx={{p: 5, color: "primary.error"}}>Sorry, an error occured:</Typography>
        <Typography variant="h5" sx={{p: 5}}>{  error || routeError?.statusText || routeError?.message }</Typography>
        <Button variant="contained" sx={{ p: 1, m: 2 }} size="large" onClick={handleClick}>BACK TO HOME</Button>
        </Paper>
        <Footer />
    </Container>
    )
}


export default ErrorPage;