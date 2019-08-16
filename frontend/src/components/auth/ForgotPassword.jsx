import React, { useState, useEffect } from "react";
import useReactRouter from "use-react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import TextFieldGroup from "../common/TextFieldGroup";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState();
  const auth = useSelector(state => state.auth);
  const { history } = useReactRouter();

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/users/forgot_password", { email })
      .then(res => console.log(res))
      .catch(err => setErrors(err));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  });

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="mt-4 mb-4 text-center">Reset password</h1>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="E-mail"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors}
              />
              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                value="Reset password"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
