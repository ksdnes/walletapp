import { Card, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { WalletContext } from "../hooks/useWallet";
import doApiCall, { AXIOS_METHOD } from "../hooks/useApi";
import { MODALS, useModals } from "../hooks/useModal";

//  **DESCRIPTION**
//The OneUser component is responsible for rendering the details of a user.
//It has been separated into its own component for reusability purposes
function OneUser({ name, userId }) {
  const { id } = useParams();
  const { walletDetails, fetchWalletDetails } = useContext(WalletContext);
  const { showModal } = useModals();
  
 
  const addUserHandler = (userId) => {
    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${id}/grant_access`,
      (responseData) => {
        console.log("User added successfully:", responseData);
        fetchWalletDetails(responseData.id);
        console.log(walletDetails);
      },
      (message) => {
        showModal(MODALS.ERROR, { message });
      },
      requestData
    );
  };

  const requestData = {
    user_id: userId,
  };

  return (
    <React.Fragment>
      <Card>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10} sm={10}>
            <Typography variant="subtitle2" color="text.secondary">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <IconButton onClick={() => addUserHandler(userId)}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}

export default OneUser;
