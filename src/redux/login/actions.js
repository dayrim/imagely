import * as LO from "redux/login/const";

export const facebookLogin = payload => ({
  type: LO.LOGIN.START,
  payload: { ...payload, loading: true }
});
