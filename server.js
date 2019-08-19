const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const winston = require("winston");
const expressWinston = require("express-winston");
const Sequelize = require("sequelize");

const { User, Token } = require("./sequelize");

const users = require("./routes/api/users");

const app = express();

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function(req, res) {
      return false;
    } // optional: allows to skip some log messages based on request and/or response
  })
);

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.json({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(function(err, req, res, next) {
  res.status(400).send({ errors: [{ msg: err.message }] });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
