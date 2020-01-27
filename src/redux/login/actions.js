import * as LO from "redux/login/const";

export const facebookLogin = () => ({
  type: LO.LOGIN.START,
  payload: { loading: true }
});
