import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { MODALS, useModals } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";

function LandingPage() {
  const { showModal } = useModals();
  const { autToken } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={4}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to the Wallet Store
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Manage your finances and transactions with ease.
      </Typography>
      <Box marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          onClick={() => {
            if (autToken === false) {
              showModal(MODALS.LOGIN);
            }
            if (autToken !== false) {
              navigate("/me"); // The log is working, but do not navigate to "/me" unforunately
              console.log("ok");
            }
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;
