import React from "react";
import Button from "../common/Button";
import Search from "../common/Search";
import AddExperimentModal from "../teamdetails/AddExperimentModal";

const Header = ({ pagetitle, label, url, search, onSearch, onClick, modalButton }) => {
  let searchbox =
    search === true ? (
      <div className="search">
        <Search onChange={onSearch} onClick={onClick} />
      </div>
    ) : (
      ""
    );
  let button = "";
  if (!!url && !!label) {
    button = (
      <div className="action" onClick={onClick}>
        <Button label={label} url={url} />
      </div>
    );
  } else if (modalButton === true) {
    button = <AddExperimentModal label="Add Experiment" />;
  } else {
    button = "";
  }

  return (
    <div className="header-bar">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 d-flex align-items-center">
            <h1>{pagetitle}</h1>
          </div>
          <div className="col-sm-6">{searchbox}</div>
          <div className="col-sm-3">{button}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
