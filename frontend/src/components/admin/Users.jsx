import React, { useState, useEffect } from "react";
import axios from "axios";
import DatatablePage from "../common/DatatablePage";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/api/users");
      setUsers(res.data.users);
    };
    getUsers();
  }, []);

  const handleDelete = async id => {
    await axios.delete(`/api/users/${id}`).then(res => setUsers(res.data.users));
  };

  return (
    <React.Fragment>
      <DatatablePage data={users} handleDelete={handleDelete} />
    </React.Fragment>
  );
};
export default Users;
