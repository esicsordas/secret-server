import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HashCodeProvider = ( { id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <Paper>
            <Typography>Your secret's identifier</Typography>
            <Typography>{id}</Typography>
            <Button variant="contained" onClick={handleClick}>OK</Button>
        </Paper>
    )
}

export default HashCodeProvider;