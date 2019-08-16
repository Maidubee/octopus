import React, { useEffect } from "react";
import axios from "axios";
import useReactRouter from "use-react-router";
import { Link } from "react-router-dom";

const ConfirmAccount = () => {
  const { match, history } = useReactRouter();
  useEffect(() => {
    axios.get(`/api/users/confirm/${match.params.token}`).catch(() => history.push("/"));
  }, [history, match.params.token]);

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="text-center mt-4 mb-4">Account confirmed!</h1>
            <Link to="/login">Click here to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
