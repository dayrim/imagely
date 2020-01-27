import React from "react";
import { Snackbar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";

import Toolbar from "modules/Toolbar";
import { getGlobalError, getAlertVariant, getGlobalErrorMsg } from "redux/ui";

const useStyles = makeStyles({
  snackbar: {
    width: "100%"
  },
  alert: {
    width: "60%"
  },
  root: {
    minHeight: "95vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Layout({ children }) {
  const classes = useStyles();
  const errorMsg = useSelector(getGlobalErrorMsg);
  const errorState = useSelector(getGlobalError);
  const alertVariant = useSelector(getAlertVariant);

  return (
    <React.Fragment>
      <Toolbar></Toolbar>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        className={classes.snackbar}
        open={errorState}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={alertVariant}
          className={classes.alert}
        >
          {errorMsg}
        </MuiAlert>
      </Snackbar>
      <Container className={classes.root} fixed>
        {children}
      </Container>
    </React.Fragment>
  );
}
