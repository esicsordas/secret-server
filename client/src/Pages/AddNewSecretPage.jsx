import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Header from "../Components/Header";
import SecretForm from "../Components/SecretForm";
import Footer from "../Components/Footer";

const AddNewSecretPage = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    setCurrentComponent(<SecretForm handleChange={setCurrentComponent} />);
  }, []);

  return (
    <Container sx={{ mt: 12 }}>
      <Header />
      <Typography variant="h4">Save your secret</Typography>
      {currentComponent}
      <Footer />
    </Container>
  );
};

export default AddNewSecretPage;
