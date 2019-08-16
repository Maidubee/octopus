import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useReactRouter from "use-react-router";
import TextFieldGroup from "../common/TextFieldGroup";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const auth = useSelector(state => state.auth);
  const { history, match } = useReactRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
    axios.get(`/api/users/reset_password/${match.params.token}`).catch(() => history.push("/"));
  });

  const onSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/users/reset_password/${match.params.token}`, {
        password,
        confirmPassword
      })
      .then(() => setConfirmationMessage("Password reset e-mail sent."));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="mt-4 mb-4 text-center">Reset password</h1>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                value="Reset password"
              />
            </form>
            {confirmationMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
