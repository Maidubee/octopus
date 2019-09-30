module.exports = (sequelize, type) => {
  return sequelize.define("client", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    street_name: type.STRING,
    street_number: type.INTEGER,
    postal_code: type.STRING,
    city: type.STRING,
    });
};
