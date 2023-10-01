import { Paper, Typography } from "@mui/material";

const SecretProvider = ( { secret }) => {

return (
    <Paper>
        <Typography>Your secret:</Typography>
        <Typography>{secret}</Typography>
    </Paper>
)
}

export default SecretProvider;