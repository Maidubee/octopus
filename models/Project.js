module.exports = (sequelize, type) => {
  return sequelize.define("project", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    number: type.INTEGER,
    cost_center: type.INTEGER,
    user_id: type.INTEGER
    });
};
