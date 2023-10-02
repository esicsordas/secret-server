import { Paper, InputLabel, Input, Button, FormControl, Container, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SecretProvider from "./SecretProvider";
import { useError } from "../Context/ErrorContext";

const getSecret = (id) => {
  return fetch(`http://localhost:3000/v1/secret/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const HashForm = ({ handleChange }) => {
  const [hashCode, setHashCode] = useState(null);
  const navigate = useNavigate();
  const { catchError } = useError();

  const handleInputChange = (e) => {
    setHashCode(e.target.value);
  };

  const handleSubmit = (id) => {
    getSecret(id)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        }
        return res.json();
      })
      .then((data) => {
        handleChange(<SecretProvider secret={data} />);
      })
      .catch((error) => {
        catchError(error.message);
        navigate("/error");
      });
  };

  return (
    <Container sx={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
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
            <InputLabel >Write in the identifier!</InputLabel>
            <Input
              required={true}
              onChange={handleInputChange}
              placeholder="Your identifier"
              sx={{my:6, mx: 2, px: 6}}
            ></Input>
          </FormControl >
          <Box sx={{display: "flex", justifyContent: "center"}}>
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
