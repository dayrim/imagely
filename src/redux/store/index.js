import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducer";
import rootEpic from "./epic";

export const history = createBrowserHistory();

export default initialState => {
  const epicMiddleware = createEpicMiddleware();
  const enhancer = compose(
    applyMiddleware(routerMiddleware(history), epicMiddleware),
    devToolsEnhancer({
      name: "Facebook photo album",
      trace: true,
      traceLimit: 30
    })
  );

  const store = createStore(rootReducer(history), initialState, enhancer);
  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const nextReducer = require("./reducer").default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }
  epicMiddleware.run(rootEpic);
  return store;
};
