import React from "react";
import { Link } from "react-router-dom";

const RelatedItems = ({ type, label, items }) => {
  return (
    <>
      <h2>Related {label}</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link to={`/${type}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RelatedItems;
