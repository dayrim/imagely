import React from "react";
import Button from "@material-ui/core/Button";
import { Facebook } from "@material-ui/icons";

const Login = () => {
  return (
    <>
      <Button
        startIcon={<Facebook />}
        size="large"
        variant="contained"
        color="primary"
      >
        LOG IN WITH FACEBOOK
      </Button>
    </>
  );
};

export default Login;
