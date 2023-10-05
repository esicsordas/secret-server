import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../Context/ErrorContext";
import { createSecret } from "../fetch";
import { FormControl, Button, Paper, InputLabel, Input } from "@mui/material";


const SecretForm = ({ onChange }) => {
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

  async function handleSubmit(secret) {
    try {
      const response = await createSecret(secret);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      onChange(data.hash);
    } catch (error) {
      catchError(error.message);
      navigate("/error");
  };
}

  return (
    <Paper sx={{ px: 4, py: 5, m: 2 }} elevation={4}>
      <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);}}>
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
          />
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
          />
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
            placeholder="Write in an integer for minutes!"
            inputProps={{ min: 0, max: 9999999 }}
            sx={{my:6, mx:2 }}
          />
        </FormControl>
        <Button type="submit" variant="contained">
          SUBMIT
        </Button>
      </form>
    </Paper>
  );
};


export default SecretForm;