import { Paper, Typography, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SecretProvider = ({ secret }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        xs: "disableGutters",
      }}
    >
      <Paper sx={{ px: 4, py: 5, m: 2 }} elevation={4}>
        <Typography variant="h5" sx={{p: 3}}>Your secret:</Typography>
        <Typography variant="h6" sx={{p: 3, color:"primary.dark", fontStyle: "italic"}}>{secret.secret_text}</Typography>
        <Box sx={{display: "flex", justifyContent: "center"}}>
        <Button variant="contained" onClick={handleClick}>
          OK
        </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SecretProvider;
