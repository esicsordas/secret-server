import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import Footer from './Components/Footer';
import Header from './Components/Header';

const App = () => {
    const navigate = useNavigate();

    const goToNewSecret = () => {
        navigate("/add-new-secret")
    }

    const goToGetSecret = () => {
        navigate("/get-a-secret")
    }

    return (
        <>
            <Header />
            <Container sx={{ mt: 12 }}>
                <Typography variant="h3" sx={{ my: 6, textAlign: "center" }}>The Secret Server</Typography>

                <Typography variant="h5" sx={{ my: 8, textAlign: "center" }}>Save your secret, and send to whoever you want to
                    - with the page we provide, only those people can acces the secret, who you want.</Typography>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-around", gap: 4 }}>
                    <Button variant="contained" sx={{ p: 1, m: 2 }} size="large" onClick={goToNewSecret}>Add new secret</Button>

                    <Button variant="contained" sx={{ p: 1, m: 2 }} size="large" onClick={goToGetSecret}>Retrieve secret</Button>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default App;