const Sequelize = require("sequelize");

const UserModel = require("./models/User");
const TokenModel = require("./models/Token");
const ObjectModel = require("./models/Object");
const ClientModel = require("./models/Client");
const ProjectModel = require("./models/Project");
const SupplierModel = require("./models/Supplier");
const SubProjectModel = require("./models/SubProject");

const sequelize = new Sequelize(
  "mysql://dtna9lwshlzpfwao:f7zerqu5ti0j00nk@w1kr9ijlozl9l79i.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ljyw54uzviyfzsd7"
);

const User = UserModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);
const Object = ObjectModel(sequelize, Sequelize);
const Client = ClientModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const Supplier = SupplierModel(sequelize, Sequelize);
const SubProject = SubProjectModel(sequelize, Sequelize);

Token.belongsTo(User);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Token,
  Object,
  Client,
  Project,
  Supplier
};
