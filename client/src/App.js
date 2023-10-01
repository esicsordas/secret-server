import { Button, Container, Typography } from '@mui/material';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();

    const goToNewSecret = () => {
        navigate("/add-new-secret")
    }

    const goToGetSecret = () => {
        navigate("/get-a-secret")
    }

    return (
        <Container>
            <Header></Header>

            <Typography variant="h2">The Secret Server</Typography>

            <Typography>Save your secret, and send to whoever you want to
             - with the page we provide, only those people can acces the secret, who you want.</Typography>

             <Button variant="contained" onClick={goToNewSecret}>Add new secret</Button>

             <Button variant="contained" onClick={goToGetSecret}>Retrieve secret</Button>

            <Footer></Footer>
        </Container>

    )
}

export default App;