import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserName } from "redux/login";
import { facebookAPI } from "services";
import { getStatus } from "redux/login";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  language: {
    marginLeft: "auto"
  },
  select: {
    color: "#FFFFFF",
    marginRight: theme.spacing(2),
    fontSize: "0.875rem",
    fontWeight: "500",
    "&:before": {
      border: "none"
    },
    "&:hover:not(.Mui-disabled):before": {
      border: "none"
    },
    "& svg": {
      color: "#FFFFFF"
    }
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const userName = useSelector(getUserName);
  const loginStatus = useSelector(getStatus);
  const { t, i18n } = useTranslation("translation");
  const [language, setLanguage] = useState(i18n.language);
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          {userName && (
            <Typography variant="h6" className={classes.title}>
              {t("title")}, {userName} !
            </Typography>
          )}
          <FormControl className={classes.language}>
            <Select
              value={language}
              onChange={e => {
                setLanguage(e.target.value);
                i18n.changeLanguage(e.target.value);
              }}
              displayEmpty
              variant="standard"
              className={classes.select}
            >
              <MenuItem value={"est"}>{t("languageSelect.estonian")}</MenuItem>
              <MenuItem value={"en"}>{t("languageSelect.english")}</MenuItem>
            </Select>
          </FormControl>
          {loginStatus === "connected" && (
            <Button color={"inherit"} onClick={() => facebookAPI.logout()}>
              {t("logout")}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
