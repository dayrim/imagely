export const getLoader = loaderName => state =>
  ({
    photosLoader: state.photos.loading,
    loginLoader: state.login.loading
  }[loaderName]);

export const getGlobalErrorMsg = state => state.ui.globalErrorMsg;
export const getGlobalError = state => state.ui.globalError;
export const initialLoader = state =>
  state.photos.loading && state.login.loading;
export const getAlertVariant = state => state.ui.alertVariant;
