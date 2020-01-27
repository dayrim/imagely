/* eslint-disable no-undef */

export const getLoginStatus = async () => {
  return new Promise((resolve, reject) => {
    try {
      FB.getLoginStatus(response => {
        resolve(response);
      });
    } catch (err) {
      reject(err);
    }
  });
};
export const onEvent = (event, callback) => {
  FB.Event.subscribe(event, callback);
};
export const login = async params => {
  return new Promise((resolve, reject) => {
    try {
      FB.login(response => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(new Error("User cancelled login or did not fully authorize."));
        }
      }, params);
    } catch (err) {
      reject(err);
    }
  });
};

export const logout = async params => {
  return new Promise((resolve, reject) => {
    try {
      FB.logout(response => {
        resolve(response);
      }, params);
    } catch (err) {
      reject(err);
    }
  });
};
export const request = async (request, method = "post", params) => {
  return new Promise((resolve, reject) => {
    try {
      FB.api(request, method, params, response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
export const init = (
  params = {
    appId: "174673063904076",
    status: true,
    xfbml: true,
    cookie: true,
    version: "v5.0"
  }
) => {
  FB.init(params);
};
