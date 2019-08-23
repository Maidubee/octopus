const Sequelize = require("sequelize");
const UserModel = require("./models/User");
const TokenModel = require("./models/Token");

const sequelize = new Sequelize(
  "mysql://dtna9lwshlzpfwao:f7zerqu5ti0j00nk@w1kr9ijlozl9l79i.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ljyw54uzviyfzsd7"
);

const User = UserModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);

Token.belongsTo(User);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Token
};
