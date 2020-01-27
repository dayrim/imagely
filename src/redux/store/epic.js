import { combineEpics } from "redux-observable";

import * as login from "redux/login/epic";
import * as profilePhotos from "redux/photos/epic";
import * as ui from "redux/ui/epic";

export default combineEpics(
  ...Object.values(profilePhotos),
  ...Object.values(login),
  ...Object.values(ui)
);
