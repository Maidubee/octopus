import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Users from "./components/admin/Users";
import User from "./components/user/User";
import Client from "./components/client/Client";
import NotFound from "./components/common/NotFound";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ConfirmAccount from "./components/auth/ConfirmAccount";

import "./App.scss";

// Check for token
if (localStorage[process.env.REACT_APP_JWTNAME || "jwtToken"]) {
  // Set auth token header auth
  setAuthToken(localStorage[process.env.REACT_APP_JWTNAME || "jwtToken"]);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage[process.env.REACT_APP_JWTNAME || "jwtToken"]);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/me" component={User} />
            <AdminRoute exact path="/users" component={Users} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/reset_password/:token" component={ResetPassword} />
            <Route exact path="/confirm_account/:token" component={ConfirmAccount} />
            <Route exact path="/clients" component={Client} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
