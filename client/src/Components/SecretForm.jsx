import {
  FormControl,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import HashCodeProvider from "./HashCodeProvider";

const SecretForm = ({ handleChange }) => {

  const handleSubmit = () => {
    handleChange(<HashCodeProvider id ={"Id taken from POSTreq.'s response"}/>)
  };

  return (
    <Paper sx={{ p: 2, m: 2 }} elevation={4}>
      <FormControl sx={{ display: "flex", gap:2 }}>
        <Typography>This is my secret:</Typography>
        <TextField placeholder="Write your secret here!"></TextField>
        <Typography>Number of times my secret can be watched:</Typography>
        <TextField placeholder="Write in a positive integer!"></TextField>
        <Typography>For how many minutes is my secret available:</Typography>
        <TextField placeholder="Write in a positive integer!"></TextField>
        <Button variant="contained" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </FormControl>
    </Paper>
  );
};

export default SecretForm;
