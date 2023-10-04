import { Paper, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HashCodeProvider = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container sx={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', xs: "disableGutters" }}> 
      <Paper
        sx={{
          px: 4,
          py: 5,
          m: 2,
          maxWidth: {xs: "90%", md: "50%"},
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }} elevation={4} >
        <Typography variant="h5" sx={{p: 3}}>Your secret's identifier</Typography>
        <Typography variant="h6" sx={{p: 3, color:"primary.dark", fontStyle: "italic"}}>{id}</Typography>
        <Button variant="contained" sx={{ p: 1, m: 2 }} size="large" onClick={handleClick}>
          OK
        </Button>
      </Paper>
    </Container>
  );
};


export default HashCodeProvider;