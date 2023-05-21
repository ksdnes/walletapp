import React from "react";
import classes from "./NewTransaction.module.css";
import { Container, Grid, Button } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Card from "../../../UI/Card";
import { useNavigate, useParams } from "react-router-dom";
import doApiCall, { AXIOS_METHOD } from "../../../hooks/useApi";
//  **DESCRIPTION**
// New transaction screen in order to add new transaction to the wallet
function NewTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Card className={classes.reg}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Formik
              initialValues={{ title: "", amount: 0 }}
              onSubmit={(values, { setFieldError, setSubmitting }) => {
                setSubmitting(true);
                doApiCall(
                  AXIOS_METHOD.PUT,
                  `/transactions`,
                  (newTransaction) => {
                    navigate(`/me/wallet/${id}`);
                    console.log(newTransaction);
                  },
                  (apiError) => {
                    setFieldError("title", apiError);
                    setSubmitting(false);
                  },
                  {
                    wallet_id: id,
                    title: values.title,
                    amount: values.amount,
                    extra: {},
                  }
                );
              }}
            >
              <Form>
                <Field
                  fullWidth
                  name="title"
                  type="text"
                  component={TextField}
                  label={"Transaction title"}
                  variant={"filled"}
                />
                <Field
                  fullWidth
                  name="amount"
                  type="number"
                  component={TextField}
                  label={"Amount"}
                  variant={"filled"}
                />
                <Button type="submit" color="primary" variant={"contained"}>
                  Add new transaction
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
}

export default NewTransaction;
