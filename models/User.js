const passwordValidator = require("password-validator");
const passwordRequirements = new passwordValidator();
const bcrypt = require("bcryptjs");

passwordRequirements
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(30) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: type.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      name: {
        type: type.STRING,
        allowNull: false,
        validate: {
          is: ["^[a-z]+$", "i"]
        }
      },
      password: {
        type: type.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        findByEmail: async email => {
          console.log(this);
        }
      },
      hooks: {
        beforeSave: async (user, options) => {
          if (user.changed("password")) {
            if (!passwordRequirements.validate(user.password)) {
              throw new Error("Password requirements not met");
            }
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    }
  );
};
