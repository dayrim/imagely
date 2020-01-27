import * as UI from "redux/ui/const";

export const setGlobalError = payload => ({
  type: UI.GLOBAL_ERROR.SET,
  meta: {
    error: payload
  }
});
