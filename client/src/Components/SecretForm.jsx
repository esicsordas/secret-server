import { FormControl, Button, Paper, InputLabel, Input } from "@mui/material";
import HashCodeProvider from "./HashCodeProvider";
import { useState } from "react";


const createSecret = (secret) => {
    secret.expire_after = parseInt(secret.expire_after)
    secret.expire_after_views = parseInt(secret.expire_after_views)
    
  return fetch(`http://localhost:3000/v1/secret`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(secret),
  });
};

const SecretForm = ({ handleChange }) => {
  const [formData, setFormData] = useState({
    "secret_text": null,
    "expire_after": null,
    "expire_after_views": null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (secret) => {
    createSecret(secret)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response wasn't ok");
        }
      })
      .then((data) => {
        const id = data.hash;
        handleChange(<HashCodeProvider id={id} />);
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
            handleSubmit(formData);
        }}
      >

      <FormControl sx={{ display: "flex", gap: 2 }}>
        <InputLabel htmlFor="secret_text">This is my secret:</InputLabel>
        <Input
          id="secret_text"
          name="secret_text"
          type="text"
          required={true}
          value={formData.secret_text || ""}
          onChange={handleInputChange}
          placeholder="Write your secret here!"
        ></Input>
        </FormControl>
        <FormControl sx={{ display: "flex", gap: 2 }}>
        <InputLabel htmlFor="expire_after_views">
          Number of times my secret can be viewed:
        </InputLabel>
        <Input
          id="expire_after_views"
          name="expire_after_views"
          type="number"
          required={true}
          value={formData.expire_after_views || ""}
          onChange={handleInputChange}
          placeholder="Write in a positive integer!"
          inputProps={{ min: 1}}
        ></Input>
        </FormControl>
        <FormControl sx={{display: "flex", gap: 2}}>
        <InputLabel htmlFor="expire_after">
          For how many minutes is my secret available:
        </InputLabel>
        <Input
          id="expire_after"
          name="expire_after"
          type="number"
          required={true}
          value={formData.expire_after || ""}
          onChange={handleInputChange}
          placeholder="Write in a positive integer!"
          inputProps={{ min:0}}
        ></Input>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
        >
          SUBMIT
        </Button>
    </form>

    </Paper>
  );
};

export default SecretForm;
