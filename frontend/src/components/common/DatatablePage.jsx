import React from "react";
import { MDBDataTable } from "mdbreact";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DayJS from "react-dayjs";

const DatatablePage = ({ data, handleDelete }) => {
  let formattedData =
    !!data && data.length > 0
      ? {
          columns: Object.keys(data[0])
            .map(key => ({ label: key, field: key }))
            .concat({ label: "Remove", field: "remove" }),
          rows: data.map(row => ({
            ...row,
            timestamp: <DayJS format="DD-MM-YYYY - HH:m">{String(row.timestamp)}</DayJS>,
            remove: (
              <IconButton value={row._id} onClick={() => handleDelete(row._id)}>
                <DeleteIcon value={row._id} fontSize="small" />
              </IconButton>
            )
          }))
        }
      : "";
  let tableOrMessage =
    !!formattedData.rows && formattedData.rows.length > 0 ? (
      <MDBDataTable
        striped
        bordered
        hover
        paging={false}
        responsive={true}
        searching={false}
        data={formattedData}
      />
    ) : (
      <div className="text-center mt-5">No entries yet!</div>
    );
  return <React.Fragment>{tableOrMessage}</React.Fragment>;
};

export default DatatablePage;
