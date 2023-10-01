import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <>
            <Button variant="contained" onClick={handleClick}>HOME</Button>
        </>
    )
}

export default Header;