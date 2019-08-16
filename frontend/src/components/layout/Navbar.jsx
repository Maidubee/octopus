import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../img/logo.png";
import { logoutUser } from "../../actions/authActions";
import Can from "../auth/Can";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const onLogoutClick = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  let navLinks =
    auth.isAuthenticated === true ? (
      <React.Fragment>
        <li>
          <Link to="" onClick={onLogoutClick}>
            Logout
          </Link>
        </li>
        <Can
          role={auth.user.role}
          perform="users:list"
          yes={() => (
            <li>
              <Link to="/users">Users</Link>
            </li>
          )}
        />
      </React.Fragment>
    ) : (
        <React.Fragment>
          {" "}
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </React.Fragment>
      );
  let userBlock = "";
  if (auth.isAuthenticated === true) {
    let name = auth.user.name;
    let nameArray = name.split(" ");
    let initials =
      nameArray.length > 1
        ? nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
        : nameArray[0].charAt(0);
    userBlock = (
      <div className="user">
        <span>
          <i className="user-icon">{initials}</i>
          <Link to="/me">{name}</Link>
        </span>
      </div>
    );
  }

  return (
    <nav className="navigation">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Octopus logo" />
          </Link>
        </div>
        <ul className="main-nav">{navLinks}</ul>
        {userBlock}
      </div>
    </nav>
  );
};

export default Navbar;
