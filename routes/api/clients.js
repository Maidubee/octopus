const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();

const sequelize = new Sequelize(
  "mysql://dtna9lwshlzpfwao:f7zerqu5ti0j00nk@w1kr9ijlozl9l79i.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ljyw54uzviyfzsd7"
);

router.get("/add", async function (req, res) {
  try {
    const result = await sequelize.query("INSERT into clients (id, name, \
      street_name, street_number, postal_code, city, createdAt, updatedAt)\
       VALUES (id, 'Berend', 'Mient', 112, '2141TE', 'Vijfhuizen', createdAt, updatedAt)");
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async function (req, res) {
  try {
    const result = await sequelize.query("SELECT * FROM clients");
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
