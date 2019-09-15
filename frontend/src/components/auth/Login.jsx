import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import TextFieldGroup from "../common/TextFieldGroup";
import { MDBAlert } from "mdbreact";
import firebase from "../firebase";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { token } = await firebase.login(email, password);
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const showErrors =
    errors.length > 0
      ? errors.map(error => (
          <MDBAlert className="mt-2" color="danger">
            {error.msg}
          </MDBAlert>
        ))
      : "";

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="text-center mt-4 mb-4">Log In</h1>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <TextFieldGroup
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <input type="submit" className="btn btn-primary btn-block mt-2 mb-4" value="Login" />
              <Link to="forgot_password">
                <small className="text-muted">Forgot your password? | </small>
              </Link>
              <Link to="/register">
                <small className="text-muted">Create account</small>
              </Link>
            </form>
            {showErrors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
