import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import doApiCall, { AXIOS_METHOD, useApi } from "../../hooks/useApi";
import OneTransaction from "../../components/OneTransaction";
import OneUser from "../../components/OneUser";
import { Delete } from "@mui/icons-material";
import { WalletContext } from "../../hooks/useWallet";
import { MODALS, useModals } from "../../hooks/useModal";

function formatDate(dateString) {
  return new Date(dateString).toUTCString();
}

function WalletDetails() {
  //states
  const [sortOrder, setSortOrder] = useState("date-desc");
  //nav
  const navigate = useNavigate();
  //params
  const { id } = useParams();
  //hooks
  const { walletDetails, fetchWalletDetails } = useContext(WalletContext);
  const [usersWithoutAccess, setUsersWithoutAccess] = useState(false);
  const { showModal } = useModals();
  const [usersList, userLoading] = useApi(AXIOS_METHOD.POST, "/user/list", {
    prefix: "",
    limit: 5,
    cursor: "",
  });

  useEffect(() => {
    doApiCall(
      AXIOS_METHOD.GET,
      `/wallet/${id}`,
      (responseData) => {
        fetchWalletDetails(responseData.id);
      },
      (message) => {
        showModal(MODALS.ERROR, { message });
      }
    );
  }, [id]);

  //Remove acces

  const removeUserHandler = (userId) => {
    const requestData = {
      user_id: userId,
    };

    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${id}/remove_access`,
      (responseData) => {
        fetchWalletDetails(responseData.id);
      },
      (message) => {
        showModal(MODALS.ERROR, { message });
      },
      requestData
    );
  };

  function computeUsersWithoutAccess(usersList, walletDetails) {
    return (
      usersList &&
      usersList.users.filter((user) => {
        return !walletDetails?.access.some(
          (accessUser) => accessUser.id === user.id
        );
      })
    );
  }

  useEffect(() => {
    setUsersWithoutAccess(computeUsersWithoutAccess(usersList, walletDetails));
  }, [usersList, walletDetails]);

  const [transactionDetails, transactionLoading] = useApi(
    AXIOS_METHOD.POST,
    `/transactions`,
    {
      wallet_id: id,
      limit: 5,
      cursor: "",
    }
  );

  /* if (loading === false && error !== false) {
    navigate("/404");
    return null;
  }

  if (walletDetails === false) {
    return <CircularProgress />;
  }*/

  //SORTING
  const sortTransactions = (transactions) => {
    const [sortBy, sortOrderStr] = sortOrder.split("-");
    const sortOrderFunc = sortOrderStr === "asc" ? 1 : -1;

    return transactions.sort((a, b) => {
      if (sortBy === "date") {
        return (
          sortOrderFunc * (new Date(a.created_at) - new Date(b.created_at))
        );
      } else {
        return sortOrderFunc * (a[sortBy] - b[sortBy]);
      }
    });
  };
  const handleSortClick = () => {
    if (sortOrder === "date-desc") {
      setSortOrder("date-asc");
    } else if (sortOrder === "date-asc") {
      setSortOrder("amount-desc");
    } else if (sortOrder === "amount-desc") {
      setSortOrder("amount-asc");
    } else {
      setSortOrder("date-desc");
    }
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <Box my={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Wallet name:{walletDetails?.name}
                </Typography>
                <Typography variant="body1">
                  Wallet desciptrion:{walletDetails?.description}
                </Typography>
                <Typography variant="h8">
                  Created at: {formatDate(walletDetails?.created_at)}
                </Typography>
                <Typography
                  variant="h4"
                  color={walletDetails?.balance > 0 ? "green" : "red"}
                >
                  Balance:{walletDetails?.balance + "$"}
                </Typography>

                <Card sx={{ maxWidth: 600 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5">Wallet Users:</Typography>
                        <List>
                          {walletDetails?.access.map((user) => (
                            <ListItem key={user.id}>
                              <ListItemText primary={user.name} />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => removeUserHandler(user.id)}
                                >
                                  <Delete />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    navigate(`/wallet/${id}/addnewtransaction`);
                  }}
                >
                  Add New Transaction
                </Button>
              </CardActions>
            </Card>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography>Add users</Typography>
                <Card>
                  <CardContent>
                    {userLoading ? (
                      <CircularProgress />
                    ) : (
                      usersWithoutAccess &&
                      usersWithoutAccess.map((user) => {
                        if (user && user.name) {
                          return <OneUser name={user.name} userId={user.id} />;
                        } else {
                          return null;
                        }
                      })
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h2">Transactions</Typography>
              <Button onClick={handleSortClick}>
                {sortOrder === "date-desc"
                  ? "Sort by date (desc)"
                  : sortOrder === "date-asc"
                  ? "Sort by date (asc)"
                  : sortOrder === "amount-desc"
                  ? "Sort by amount (desc)"
                  : "Sort by amount (asc)"}
              </Button>
            </Grid>
            <Card>
              <CardContent>
                {transactionLoading ? (
                  <CircularProgress />
                ) : (
                  transactionDetails &&
                  sortTransactions(transactionDetails.transactions).map(
                    (item) => (
                      <OneTransaction
                        key={item.id}
                        {...item}
                        sortOrder={sortOrder}
                      />
                    )
                  )
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default WalletDetails;
