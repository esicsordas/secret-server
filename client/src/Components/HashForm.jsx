import { Paper, TextField, Typography, Button } from "@mui/material";
import SecretProvider from "./SecretProvider";

const HashForm = ({ handleChange }) => {

const handleSubmit = () => {
    handleChange(<SecretProvider secret={"secret provided from get method"}/>)
}

    return (
    <Paper>
        <Typography>Write in the identifier!</Typography>
        <TextField placeholder="Your identifier"></TextField>
        <Button variant="contained" onClick={handleSubmit} >SUBMIT</Button>
    </Paper>
)
}

export default HashForm;