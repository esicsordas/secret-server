import { Button, Container, Typography } from '@mui/material';
import Footer from './Components/Footer';
import Header from './Components/Header';

const App = () => {
    return (
        <Container>
            <Header></Header>

            <Typography variant="h2">The Secret Server</Typography>

            <Typography>Save your secret, and send to whoever you want to
             - with the code we provide, only those people can acces the secret, who you want.</Typography>

             <Button variant="contained">Add new secret</Button>

             <Button variant="contained">Retrieve secret</Button>

            <Footer></Footer>
        </Container>

    )
}

export default App;