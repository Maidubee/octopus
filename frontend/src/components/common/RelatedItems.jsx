import React from "react";
import CustomList from "./CustomList";

const RelatedItems = ({ type, label, items }) => {
  return (
    <>
      <CustomList type={type} label={label} items={items} />
    </>
  );
};

export default RelatedItems;
