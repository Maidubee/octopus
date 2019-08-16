import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, url }) => {
  return (
    <React.Fragment>
      <Link to={url}>
        <button className="btn btn-primary">{label}</button>
      </Link>
    </React.Fragment>
  );
};

export default Button;
