import React, { useLayoutEffect } from "react";
import FacebookLoginWithButton from "react-facebook-login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import { addScript } from "utils";
import Login from "modules/Login";
import Layout from "modules/Layout";

const id = "facebookAuth";
const src = "https://connect.facebook.net/en_US/sdk.js";

const App = () => {
  useLayoutEffect(() => {
    (async () => {
      try {
        await addScript(id, src);
        const params = {
          appId: "174673063904076",
          cookie: false,
          xfbml: false,
          version: "v5.0"
        };
        // eslint-disable-next-line no-undef
        FB.init(params);
        // eslint-disable-next-line no-undef
        const resp = FB.getLoginStatus();

        console.log("FB:status:", resp);
      } catch (error) {
        console.error(error.name, ":", error.message);
      }
    })();
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            <Login />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

// const componentClicked = () => {
//   console.log("Clicked!");
// };

// const LoginButton = ({ facebookResponse }) => (
//   <FacebookLoginWithButton
//     appId="174673063904076"
//     // autoLoad
//     fields="name,email,picture"
//     onClick={componentClicked}
//     callback={facebookResponse}
//     icon="fa-facebook"
//   />
// );

// const UserScreen = ({ user }) => (
//   <>
//     <h1>Welcome {user.name}!</h1>
//     <p>{user.email}</p>
//     <img
//       src={user.picture.data.url}
//       height={user.picture.height}
//       width={user.picture.width}
//       alt="avatar"
//     />
//   </>
// );

// class App2 extends React.Component {
//   state = { user: false };
//   facebookResponse = response => {
//     console.log(response);
//     this.setState({ ...this.state, user: response });
//   };

//   render() {
//     return (
//       <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
//         {this.state.user ? (
//           <UserScreen user={this.state.user} />
//         ) : (
//           <LoginButton facebookResponse={this.facebookResponse} />
//         )}
//       </div>
//     );
//   }
// }
