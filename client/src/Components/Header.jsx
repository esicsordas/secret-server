import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <Box  sx={{
            py: 2,
            px: 2,
            mt: "auto",
            bgcolor: "primary.light",
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            display: "flex",
            justifyContent: "flex-end",
            maxWidth: "100%"
          }}>
            <Button variant="contained" sx={{textAlign: "right"}} size="large" onClick={handleClick}>HOME</Button>
        </Box>
    )
}


export default Header;