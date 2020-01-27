import React from "react";
import { render } from "react-dom";
import App from "modules/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configStore from "redux/store";
import { addScript } from "utils";
import { facebookAPI } from "services";

import "./index.css";
import "./i18n";

const rootElem = document.getElementById("root");

export const addFacebookScript = () => {
  const id = "facebookAuth";
  const src = "https://connect.facebook.net/en_US/sdk.js";
  return addScript(id, src);
};
const bootstrap = async () => {
  const initialState = { login: {} };
  try {
    await addFacebookScript();
    facebookAPI.init();
    const loginStatus = await facebookAPI.getLoginStatus();
    Object.assign(initialState.login, loginStatus);
    if (loginStatus.authResponse) {
      const userData = await facebookAPI.request("/me", "get", {
        fields: "location,languages,name"
      });
      Object.assign(initialState.login, userData);
    }
  } catch (err) {
    return {
      ui: {
        globalErrorMsg: err.message || JSON.stringify(err),
        globalError: true,
        alertVariant: "error"
      }
    };
  }

  return initialState;
};
bootstrap().then(initialState => {
  render(
    <Provider store={configStore(initialState)}>
      <App />
    </Provider>,
    rootElem
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
