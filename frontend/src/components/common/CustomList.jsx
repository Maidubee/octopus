import React from "react";
import { MDBListGroup as ListGroup, MDBListGroupItem as ListGroupItem } from "mdbreact";
import { Link } from "react-router-dom";

const CustomList = ({ type, label, items }) => {
  return (
    <>
      <h2 className="mb-3">
        <Link to={`/${type}/all`}>{label}</Link>
      </h2>
      <ListGroup>
        {items.map(item => (
          <Link to={`/${type}/${item.id}`}>
            <ListGroupItem key={item.id} className="mb-2">
              {item.name}
            </ListGroupItem>
          </Link>
        ))}
      </ListGroup>
    </>
  );
};

export default CustomList;
