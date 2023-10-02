import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HashForm from "../Components/HashForm";

const GetASecretPage = () => {
    const [currentComponent, setCurrentComponent] = useState(null);

    useEffect(() => {
      setCurrentComponent(<HashForm handleChange={setCurrentComponent} />);
    }, []);

  return (
    <Container sx={{ mt: 12 }}>
      <Header />
        <Typography variant="h4" sx={{paddingBottom: 4}}>Get a secret</Typography>
        {currentComponent}
      <Footer />
    </Container>
  );
};

export default GetASecretPage;
