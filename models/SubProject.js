module.exports = (sequelize, type) => {
  return sequelize.define("sub_project", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: type.INTEGER,
    object_id: type.INTEGER,
    user_id: type.INTEGER,
    client_id: type.INTEGER,
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
