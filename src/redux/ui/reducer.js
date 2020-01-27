const initState = { globalError: false, alertVariant: "error" };

export default (state = initState, { meta }) => {
  if (meta) {
    return {
      ...state,
      globalErrorMsg: meta.error,
      globalError: meta.error && true,
      alertVariant: meta.alertVariant || "error"
    };
  }
  return state;
};
