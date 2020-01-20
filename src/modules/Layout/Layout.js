import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "95vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container className={classes.root} fixed>
        {children}
      </Container>
    </React.Fragment>
  );
}
