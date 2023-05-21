import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Card,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MODALS, useModals } from "../hooks/useModal";
import doApiCall, { AXIOS_METHOD } from "../hooks/useApi";
import { WalletContext } from "../hooks/useWallet";

//  **DESCRIPTION**
//The OneWallet component is responsible for rendering the details of a Wallet.
//It has been separated into its own component for reusability purposes
function OneWallet({walletid,name,description}) {
  const navigate = useNavigate();
  const {showModal}=useModals();

  const { fetchWalletDetails } = useContext(WalletContext);

  const deleteWalletHandler=()=>{

    const requestData = {
      id: walletid,
    };

    showModal(MODALS.CONFIRM,{
      message:"Are you sure you want to delete this wallet",
      onConfirmed:()=>{
        doApiCall(AXIOS_METHOD.DELETE,`/wallet/${walletid}`,
        (_unusedDeletedItem)=>{
          fetchWalletDetails(walletid);
        }, (message) => {
          showModal(MODALS.ERROR, { message });
          console.log(walletid)
        },
        {requestData}
      );
    },
  });
}

       
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Grid item xs={12} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography varian={"h4"}>{name}</Typography>
            <Typography variant={"body"}>{description}</Typography>
          </CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6}>
              <CardActions>
                <Button
                  size="small"
                  variant={"contained"}
                  fullWidth
                  onClick={() => navigate(`wallet/${walletid}`)}
                >
                  Learn more
                </Button>
              </CardActions>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <CardActions>
                <Button
                  size="small"
                  variant={"contained"}
                  color={"error"}
                  fullWidth
                  onClick={deleteWalletHandler}
                >
                  Delete Wallet
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

export default OneWallet;
