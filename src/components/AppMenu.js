import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MODALS, useModals } from "../hooks/useModal";

//  **DESCRIPTION**
// App menu on the top of the page
function AppMenu() {
  const navigate = useNavigate();
  const { handleLoginResult, autToken, logOut } = useAuth();
  const { showModal } = useModals();
  return (
    <AppBar>
      <Grid item xs={12} lg={4}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/")}
        >
          <LunchDiningIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          WalletAPP
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            handleLoginResult({
              token:
                "NjczMjExMjE2MTYwMjUyMQ_Mzc0MzgyNDkzMDIxNTU2_2246618490205178201210239816170143142103717622222516823625258142233165664717236796",
              user: {
                id: "NjczMjExMjE2MTYwMjUyMQ",
                name: "alma",
                wallets: [],
              },
            });
          }}
        >
          almateszt
        </Button>
        <Stack direction="row" spacing={2} sx={{ display: { sm: "flex" } }}>
          {autToken === false && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  showModal(MODALS.LOGIN);
                }}
              >
                Sing In
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  showModal(MODALS.REG);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {autToken !== false && (
            <>
              <Button color="inherit" onClick={() => navigate("/me")}>
                My Wallets
              </Button>
              <Button color="inherit" onClick={logOut}>
                Log Out
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
      </Grid>
    </AppBar>
  );
}

export default AppMenu;
