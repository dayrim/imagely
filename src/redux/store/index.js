import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import rootReducer from "./reducer";
import rootEpic from "./epic";

const epicMiddleware = createEpicMiddleware();

export default () => {
  const enhancer = compose(
    applyMiddleware(epicMiddleware),
    devToolsEnhancer({
      name: "Erply Launchpad",
      trace: true,
      traeLimit: 30
    })
  );

  const store = createStore(rootReducer, enhancer);
  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const nextReducer = require("./reducer").default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }
  epicMiddleware.run(rootEpic);
  return store;
};
