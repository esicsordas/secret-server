import { FormControl, Button, Paper, InputLabel, Input } from "@mui/material";
import HashCodeProvider from "./HashCodeProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../Context/ErrorContext";

const createSecret = (secret) => {
  secret.expire_after = parseInt(secret.expire_after);
  secret.expire_after_views = parseInt(secret.expire_after_views);

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
    secret_text: null,
    expire_after: null,
    expire_after_views: null,
  });
  const navigate = useNavigate();
  const { catchError } = useError();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (secret) => {
    createSecret(secret)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const id = data.hash;
        handleChange(<HashCodeProvider id={id} />);
      })
      .catch((error) => {
        catchError(error.message);
        navigate("/error");
      });
  };

  return (
    <Paper sx={{ px: 4, py: 5, m: 2 }} elevation={4}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <FormControl sx={{ display: "flex"}}>
          <InputLabel htmlFor="secret_text" >The secret:</InputLabel>
          <Input
            id="secret_text"
            name="secret_text"
            type="text"
            required={true}
            multiline={true}
            value={formData.secret_text || ""}
            onChange={handleInputChange}
            inputProps={{ maxLength: 255 }}
            placeholder="Max. 255 character"
            sx={{my:6, mx: 2}}
          ></Input>
        </FormControl>
        <FormControl sx={{ display: "flex"}}>
          <InputLabel htmlFor="expire_after_views">
            How many times can it be viewed:
          </InputLabel>
          <Input
            id="expire_after_views"
            name="expire_after_views"
            type="number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 7);
            }}
            required={true}
            value={formData.expire_after_views || ""}
            onChange={handleInputChange}
            placeholder="Write in a positive integer!"
            inputProps={{ min: 1, max: 9999999 }}
            sx={{my:6, mx:2}}
          ></Input>
        </FormControl>
        <FormControl sx={{ display: "flex"}}>
          <InputLabel htmlFor="expire_after">
            For how long is it available:
          </InputLabel>
          <Input
            id="expire_after"
            name="expire_after"
            type="number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 7);
            }}
            required={true}
            value={formData.expire_after || ""}
            onChange={handleInputChange}
            placeholder="Write in a positive integer!"
            inputProps={{ min: 0, max: 9999999 }}
            sx={{my:6, mx:2 }}
          ></Input>
        </FormControl>
        <Button type="submit" variant="contained">
          SUBMIT
        </Button>
      </form>
    </Paper>
  );
};

export default SecretForm;
