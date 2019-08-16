import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBAlert } from "mdbreact";
import useReactRouter from "use-react-router";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const { history } = useReactRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, confirmPassword }, history));
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
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="mt-4 text-center">Sign Up</h1>
            <p className="text-center mb-4">Create your Octopus account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                id="name"
                type="name"
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
              />
              <TextFieldGroup
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <input type="submit" className="btn btn-primary btn-block mt-4" value="Register" />
            </form>
            {showErrors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
