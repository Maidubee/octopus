module.exports = (sequelize, type) => {
  return sequelize.define("sub_project", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    reference_number: type.INTEGER,
    client_reference_number: type.INTEGER,
    quotation: type.FLOAT,
    request_date: type.DATE,
    deadline_date: type.DATE,
    submission_date: type.DATE,
    approval_date: type.DATE,
    });
};
