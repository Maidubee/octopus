import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useReactRouter from "use-react-router";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
import firebase from "../firebase";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const errors = useSelector(state => state.errors);
  const { history } = useReactRouter();

  useEffect(() => {
    if (firebase.auth.currentUser !== null) {
      history.push("/");
    }
  });

  const onRegister = async e => {
    e.preventDefault();

    try {
      await firebase.register(name, email, password);
      history.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login">
      <div className="logo">
        <img src={""} alt="logo" />
      </div>
      <div className="login-box">
        <h1 className="display-4 text-center">Sign Up</h1>
        <p className="lead text-center">Create your Stippl account</p>
        <form noValidate onSubmit={onRegister}>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
          />
          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={errors.password}
          />
          <input type="submit" className="button" value="Sign up" />
        </form>
      </div>
      <h4>
        Already have an account? <Link to="/login">Login here!</Link>
      </h4>
    </div>
  );
};

export default Register;
