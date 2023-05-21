import { Grid, Typography } from "@mui/material";
import React from "react";

function Page404() {
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={"h1"}> Page not found - 404</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Page404;
