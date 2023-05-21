import React from "react";
import StrengthMeter from "./RegModalPassword";
import {
  Grid,
  Button,
  Typography,
  DialogContent,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { Formik, Field, Form, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";

import doApiCall, { AXIOS_METHOD } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
//import AuthContext from "../../context/auth-context";

const RegModal = ({ onClose }) => {
  //const authCtx = useContext(AuthContext);
  const { handleLoginResult } = useAuth();
  function Result() {
    const { errors } = useFormikContext();
    if (Object.keys(errors).length > 0) {
      return null;
    }

    return (
      <div>
        <Typography variant={"h10"} color="green">
          You have filled out all the required fields. Please log in.
        </Typography>
      </div>
    );
  }
  function usernameValidate(value) {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    if (!regex.test(value)) {
      return "The Username is invalid.";
    }
  }

  function calculatePasswordStrength(value) {
    let caps, small, num;
    if (value.length < 4) {
      return "Password should contain minimum 4 characters, with one UPPERCASE, lowercase and minimum 1 number";
    } else {
      caps = (value.match(/[A-Z]/g) || []).length;
      small = (value.match(/[a-z]/g) || []).length;
      num = (value.match(/[0-9]/g) || []).length;
      if (caps < 1) {
        return "Must add one UPPERCASE letter";
      } else if (small < 1) {
        return "Must add one lowercase letter";
      } else if (num < 1) {
        return "Must add one number";
      }
    }
  }


  const PassWordError = (values) => {
    if (values.password !== values.passwordAgain) {
      return { passwordAgain: "The two passwords do not match." };
    }
  };

  function Meter(formik) {
    const { values } = useFormikContext();
    const password = values.password;
    return (
      <div>
        <StrengthMeter password={password} />
      </div>
    );
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Registration</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{}}
          validate={PassWordError}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            const onFailure = (apiError) => {
              setFieldError("name", apiError);
              setSubmitting(false);
            };

            doApiCall(
              AXIOS_METHOD.POST,
              "/reg",
              (_unusedRegata) => {
                doApiCall(
                  AXIOS_METHOD.POST,
                  "/login",
                  (data) => {
                    handleLoginResult(data);
                    onClose();
                  },
                  onFailure,
                  value
                );
              },
              onFailure,
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
                  validate={usernameValidate}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth //Password1
                  name="password"
                  type="password"
                  component={TextField}
                  label={"Password"}
                  variant={"filled"}
                  validate={calculatePasswordStrength}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth //Password2
                  name="passwordAgain"
                  type="password"
                  component={TextField}
                  label={"Please enter your password again"}
                  variant={"filled"}
                />
              </Grid>
              <Grid item xs={12}>
                <Meter fullWidth />
              </Grid>
              <Button type="submit" color="primary" variant={"contained"} fullWidth>
                Submit
              </Button>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RegModal;
