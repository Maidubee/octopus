module.exports = (sequelize, type) => {
  return sequelize.define("status", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    });
};
