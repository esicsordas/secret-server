import {
  Paper,
  InputLabel,
  Input,
  Button,
  FormControl,
  Container,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../Context/ErrorContext";
import { getSecret } from "../fetch.js";

const HashForm = ({ onChange }) => {
  const [hashCode, setHashCode] = useState(null);
  const navigate = useNavigate();
  const { catchError } = useError();

  const handleInputChange = (e) => {
    setHashCode(e.target.value);
  };

  async function handleSubmit(id) {
    try {
      const response = await getSecret(id);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      onChange(data);
    } catch (error) {
      catchError(error.message);
      navigate("/error");
    }
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Paper
        sx={{
          px: 4,
          py: 6,
          m: 2,
          maxWidth: { xs: "90%", md: "50%" },
        }}
        elevation={4}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(hashCode);
          }}
        >
          <FormControl sx={{ display: "flex", gap: 2 }}>
            <InputLabel>Write in the identifier!</InputLabel>
            <Input
              required={true}
              onChange={handleInputChange}
              placeholder="Your identifier"
              sx={{ my: 6, mx: 2, px: 6 }}
            ></Input>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default HashForm;
