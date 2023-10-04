import { useState } from "react";
import { Container, Typography } from "@mui/material";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HashForm from "../Components/HashForm";
import SecretProvider from "../Components/SecretProvider";

const GetASecretPage = () => {
    const [secret, setSecret] = useState(null);


  return (
    <Container sx={{ mt: 12 }}>
      <Header />
        <Typography variant="h4" sx={{paddingBottom: 4}}>Get a secret</Typography>
        {!secret ? <HashForm onChange={setSecret}/ > :  <SecretProvider secret={secret}/>}
      <Footer />
    </Container>
  );
};


export default GetASecretPage;