const { validationResult } = require("express-validator");

// Input validation
exports.checkForErrors = (req, res) => {
  return validationResult(req);
};

exports.notFound = res => {
  return res.status(404).json({ errors: [{ msg: "Not found" }] });
};
