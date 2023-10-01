import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SecretProvider = ( { secret }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

return (
    <Paper>
        <Typography>Your secret:</Typography>
        <Typography>{secret.secret_text}</Typography>
        <Button variant="contained" onClick={handleClick}>OK</Button>
    </Paper>
)
}

export default SecretProvider;