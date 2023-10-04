import { Box, Typography } from "@mui/material";

const Footer = () => {

  return (
      <Box
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          bgcolor: "primary.light",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "flex-end",
          maxWidth: "100%"
        }}>
          <Typography sx={{textAlign:"right"}}>
            Made by Esi Csordas, {new Date().getFullYear()}
          </Typography>
      </Box>
  );
};


export default Footer;