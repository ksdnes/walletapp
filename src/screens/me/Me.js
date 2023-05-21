import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, useColorScheme } from "@mui/material";
import OneWallet from "../../components/OneWallet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import doApiCall, { AXIOS_METHOD } from "../../hooks/useApi";
import { MODALS, useModals } from "../../hooks/useModal";
import { WalletContext } from "../../hooks/useWallet";

function ListWallets() {
  const { autToken } = useAuth();
  const [list, setList] = useState([]);
  const { showModal } = useModals();
  const navigate = useNavigate();
  const { walletDetails, fetchWalletDetails } = useContext(WalletContext);
  useEffect(() => {
    doApiCall(
      AXIOS_METHOD.GET,
      "/wallets",
      (wallets) => {
        setList(wallets);
      },
      (message) => {
        showModal(MODALS.ERROR, { message });
      },
      null,
      // set the Authorization header with the auth token
      { Authorization: `Bearer ${autToken}` }
    );
  }, [autToken,walletDetails]);

  return (
    <React.Fragment>
      <div style={{ margin: 100 }}>
        <Grid container spacing={2}>
          <p>Welcome to the ListWallets component!</p>
          {list.map((item) => (
            <OneWallet key={item.id} walletid={item.id} name={item.name} desc={item.description}/>
          ))}
          <Button
            size="small"
            variant={"outlined"}
            fullWidth
            onClick={() => navigate("/addnewwallet")}
          >
            Add new
          </Button>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default ListWallets;
