import { Paper, InputLabel, Input, Button, FormControl } from "@mui/material";
import { useState } from "react";
import SecretProvider from "./SecretProvider";

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

  const handleInputChange = (e) => {
    setHashCode(e.target.value);
  };

  const handleSubmit = (id) => {
    getSecret(id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response wasn't ok");
        }
      })
      .then((data) => {
        handleChange(<SecretProvider secret={data} />);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
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
        <Button type="submit" variant="contained">SUBMIT</Button>
      </form>
    </Paper>
  );
};

export default HashForm;
