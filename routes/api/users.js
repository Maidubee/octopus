const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const hasRole = require("../../hasRole");

// Load User model

router.get(
  "/",
  hasRole(["admin"]),
  asyncHandler(async (req, res) => {
    res.json([]);
  })
);

module.exports = router;
