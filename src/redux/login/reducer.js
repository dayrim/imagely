import * as LO from "redux/login/const";

export default (state = {}, { payload, type }) => {
  switch (type) {
    case LO.LOGIN.START:
      return { ...state, loading: payload.loading };

    case LO.LOGIN.SUCCESS:
      return {
        ...state,
        status: payload.status,
        authResponse: payload.authResponse,
        loading: payload.loading
      };
    case LO.STATUS_CHANGE.ERROR:
      return {
        ...state,
        authResponse: null,
        status: "unknown",
        loading: false
      };
    case LO.STATUS_CHANGE.SUCCESS:
      return {
        ...state,
        status: payload.status,
        authResponse: payload.authResponse,
        loading: payload.loading,
        name: payload.name,
        location: payload.location,
        languages: payload.languages
      };
    case LO.LOGIN.ERROR:
      return {
        ...state,
        authResponse: null,
        status: "unknown",
        loading: false,
        name: undefined,
        location: undefined,
        languages: undefined
      };
    default:
      return state;
  }
};

// const save = (key, value) => {
//   if (value) {
//     localStorage.setItem(key, value);
//   } else {
//     localStorage.removeItem(key);
//   }
// };
