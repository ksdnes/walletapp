import { Box, Container, Typography } from "@mui/material";
//  **DESCRIPTION**
// Footer on the button of the page
function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 4,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          {new Date().getFullYear()} WalletApp - Kis-Simonka Dénes
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          component="p"
        >
          Webuni, my final project work
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
