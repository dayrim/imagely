import React from "react";
import Button from "@material-ui/core/Button";
import { Facebook } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    height: "50px",
    "& .MuiButton-startIcon": {
      marginRight: "15px",
      "& svg": {
        fontSize: "35px"
      }
    }
  }
}));

const FBLogin = ({ onClick }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  return (
    <>
      <Button
        startIcon={<Facebook />}
        size="large"
        variant="contained"
        color="primary"
        onClick={onClick}
        className={classes.root}
      >
        {t("login")}
      </Button>
    </>
  );
};

export default FBLogin;
