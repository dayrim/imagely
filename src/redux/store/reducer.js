import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import login from "redux/login/reducer";
import photos from "redux/photos/reducer";
import ui from "redux/ui/reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    login,
    photos,
    ui
  });
