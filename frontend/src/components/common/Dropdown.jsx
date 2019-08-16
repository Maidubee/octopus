import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const Dropdown = ({ buttonname, classname, options }) => {
  return (
    <MDBDropdown className={classname}>
      <MDBDropdownToggle caret color="primary">
        {buttonname}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        {options.map(option => (
          <MDBDropdownItem key={option}>{option}</MDBDropdownItem>
        ))}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default Dropdown;
