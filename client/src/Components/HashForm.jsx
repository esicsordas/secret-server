import { Paper, InputLabel, Input, Button, FormControl } from "@mui/material";
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
        catchError(error.message)
        navigate("/error");
      })
      ;
  };

  return (
    <Paper sx={{ p: 2, m: 2 }} elevation={4}>
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
          ></Input>
        </FormControl>
        <Button type="submit" variant="contained">
          SUBMIT
        </Button>
      </form>
    </Paper>
  );
};

export default HashForm;
