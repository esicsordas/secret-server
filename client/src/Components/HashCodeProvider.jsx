import { Paper, Typography } from "@mui/material";

const HashCodeProvider = ( { id }) => {

    return (
        <Paper>
            <Typography>Your secret's identifier</Typography>
            <Typography>{id}</Typography>
        </Paper>
    )
}

export default HashCodeProvider;