import { combineEpics } from "redux-observable";

import * as login from "redux/login/epic";

export default combineEpics(...Object.values(login));
