import React from "react";
import {
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import doApiCall, { AXIOS_METHOD } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

//  **DESCRIPTION**
// Login modal
function LoginModal({ onClose }) {
  const { handleLoginResult } = useAuth();
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            doApiCall(
              AXIOS_METHOD.POST,
              "/login",
              (data) => {
                handleLoginResult(data);
                onClose();
              },
              (apiError) => {
                setFieldError("password", apiError);
              },
              value
            );
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth //Username
                  name="name"
                  type="text"
                  component={TextField}
                  label={"Username"}
                  variant={"filled"}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth //password
                  name="password"
                  type="password"
                  component={TextField}
                  label={"Password"}
                  variant={"filled"}
                />
              </Grid>             
              <Grid item xs={12} >
                <Button type="submit"color="primary" variant={"contained"} fullWidth>
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
