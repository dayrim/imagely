import React from "react";
import { render } from "react-dom";
import App from "modules/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configStore from "redux/store";
import { addScript } from "utils";

const rootElem = document.getElementById("root");

export const addFacebookScript = () => {
  const id = "facebookAuth";
  const src = "https://connect.facebook.net/en_US/sdk.js";
  return addScript(id, src);
};

render(
  <Provider store={configStore()}>
    <App />
  </Provider>,
  rootElem
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
