import { useState } from "react";
import { Container, Typography } from "@mui/material";
import Header from "../Components/Header";
import SecretForm from "../Components/SecretForm";
import Footer from "../Components/Footer";
import HashCodeProvider from "../Components/HashCodeProvider";

const AddNewSecretPage = () => {
  const [id, setId] = useState(null);

  return (
    <Container sx={{ mt: 12 }}>
      <Header />
      <Typography variant="h4">Save your secret</Typography>
      {!id ? <SecretForm onChange={setId} /> : <HashCodeProvider id={id}/>}
      <Footer />
    </Container>
  );
};


export default AddNewSecretPage;