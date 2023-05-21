import React, { useState } from "react";

import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Card from "../../UI/Card";
import { useNavigate } from "react-router-dom";
import doApiCall, { AXIOS_METHOD } from "../../hooks/useApi";

function NewWallet() {
  const navigate = useNavigate();
  const [internet, setInternet] = useState(false);
  return (
    <>
      <Card>
        <Typography variant={"h4"}>Add new wallet</Typography>
        <Formik
          initialValues={{ name: "", description: "", extra: { balance: 0 } }}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            doApiCall(
              AXIOS_METHOD.PUT,
              "/wallet",
              (newWalletDetails) => {
                navigate("/me/");
                console.log(value);
              },
              (apiError) => {
                setFieldError("name", apiError);
                setSubmitting(false);
              },
              value
            );
          }}
        >
          <Form>
            <br />
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="Title"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  multiline
                  fullWidth
                  minRows={8}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                  type="number"
                  name="balance"
                />
              </Grid>

              <Button variant={"outlined"} type="submit">
                Add new
              </Button>
            </Grid>
          </Form>
        </Formik>
      </Card>
    </>
  );
}

export default NewWallet;
