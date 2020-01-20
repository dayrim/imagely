import * as LO from "redux/login/const";

const initState = { status: {}, loading: false };

export default (state = initState, { payload, type }) => {
  switch (type) {
    case LO.LOGIN.START:
      return { ...state, loading: payload.loading };

    case LO.LOGIN.SUCCESS:
      return {
        ...state,
        status: payload.status,
        loading: payload.loading
      };
    case LO.LOGIN.ERROR:
      return {
        ...state,
        status: undefined,
        loading: false
      };
    default:
      return state;
  }
};

const save = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};
