import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import { updateUserProfile } from "../../actions/authActions";

const User = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [name, setName] = useState(auth.user.name);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      updateUserProfile(auth.user.id, {
        name: name,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
      })
    );
  };

  const handleShowPasswordChange = e => {
    e.preventDefault();
    setShowPasswordChange(!showPasswordChange);
  };

  return (
    <div className="container mt-4">
      <form noValidate onSubmit={onSubmit}>
        <input
          id="name"
          label="Name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <hr />
        {showPasswordChange && (
          <React.Fragment>
            <TextFieldGroup
              id="currentPassword"
              placeholder="Current password"
              type="password"
              onChange={e => setCurrentPassword(e.target.value)}
              value={currentPassword}
            />
            <TextFieldGroup
              id="newPassword"
              placeholder="New password"
              type="password"
              onChange={e => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <TextFieldGroup
              id="confirmNewPassword"
              placeholder="Confirm new password"
              type="password"
              onChange={e => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </React.Fragment>
        )}

        <button className="btn btn-primary mb-2" onClick={handleShowPasswordChange}>
          Change password
        </button>
        <hr />
        <input type="submit" className="btn btn-primary mb-2" value="Update profile" />
      </form>
    </div>
  );
};

export default User;
