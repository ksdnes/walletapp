import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
//  **DESCRIPTION**
//The OneTransaction component is responsible for rendering the details of a single transaction. It has been separated into its own component for reusability purposes.
function OneTransaction({ title, amount, created_by, created_at }) {
  function colorHandler(price) {
    if (price > 0) {
      return "green";
    } else {
      return "red";
    }
  }
  return (
    <React.Fragment>
      <Card sx={{ my: 1, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Created by: {created_by.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {new Date(created_at).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent sx={{ textAlign: "right" }}>
              <Typography variant="h6" color={amount > 0 ? "green" : "red"}>
                {amount} $
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}

export default OneTransaction;
