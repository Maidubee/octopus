const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const passwordValidator = require("password-validator");
const passwordRequirements = new passwordValidator();

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

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "innovator"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (!passwordRequirements.validate(this.password)) {
    throw new Error("Password requirements not met");
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.setVerified = async function() {
  this.isVerified = true;
};

UserSchema.methods.updateName = async function(newName) {
  this.name = newName;
};

UserSchema.methods.updateEmail = async function(newEmail) {
  this.email = newEmail;
};

UserSchema.methods.updatePassword = async function(
  currentPassword,
  newPassword,
  confirmNewPassword
) {
  if (newPassword !== undefined && confirmNewPassword !== undefined) {
    const passwordIsCorrect = await bcrypt.compare(currentPassword, this.password);
    if (!passwordIsCorrect) {
      throw new Error("Old password incorrect");
    }
    if (newPassword !== confirmNewPassword) {
      throw new Error("Passwords don't match");
    }
    this.password = newPassword;
  } else {
    this.password = currentPassword;
  }
};

UserSchema.statics.findByEmail = async function(email) {
  return await this.findOne({ email });
};

UserSchema.statics.findByID = async function(id) {
  return await this.findOne({ _id: id });
};

UserSchema.statics.all = async function(id) {
  return await this.find({}, "name email role");
};

User = mongoose.model("users", UserSchema);
module.exports = User;
