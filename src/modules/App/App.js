import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { FBLogin } from "components";
import Layout from "modules/Layout";
import Collection from "modules/Collection";
import Album from "modules/Album";
import ImageModal from "modules/ImageModal";
import { facebookAPI } from "services";
import { history } from "redux/store";
import { useSelector } from "react-redux";
import { getStatus } from "redux/login";

const App = () => {
  const loginStatus = useSelector(getStatus);
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route path="/">
          <Route
            path="/"
            render={({ location: { pathname } }) => {
              return loginStatus === "connected" ? (
                <>
                  {pathname === "/" && <Redirect to="/albums" />}

                  <Route path="/albums/:albumID">
                    <Album />
                  </Route>
                  <Route exact path={`/albums/:albumID/:imageID`}>
                    <ImageModal></ImageModal>
                  </Route>
                  <Route exact path="/albums">
                    <Collection />
                  </Route>
                </>
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            exact
            path="/login"
            render={() =>
              loginStatus === "connected" ? (
                <Redirect to="/" />
              ) : (
                <FBLogin
                  onClick={() =>
                    facebookAPI.login({
                      scope: "user_photos",
                      auth_type: "rerequest"
                    })
                  }
                />
              )
            }
          />
        </Route>
      </Layout>
    </ConnectedRouter>
  );
};

export default App;
