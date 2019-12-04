import React from "react";
import useReactRouter from "use-react-router";
import projects from "../common/projects.json";
import clients from "../common/clients.json";
import suppliers from "../common/suppliers.json";
import objects from "../common/objects.json";
import DatatablePage from "./DatatablePage.jsx";

const GenericAll = () => {
  const { match } = useReactRouter();
  let listToUse = null;
  switch (match.params.entity) {
    case "client":
      listToUse = clients;
      break;
    case "project":
      listToUse = projects;
      break;
    case "object":
      listToUse = objects;
      break;
    case "supplier":
      listToUse = suppliers;
      break;
    default:
      listToUse = [];
  }

  return (
    <>
      <DatatablePage data={listToUse} />
    </>
  );
};

export default GenericAll;
