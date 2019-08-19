const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const hasRole = require("../../hasRole");

const Mailjet = require("node-mailjet").connect("TBD");

const keys = require("../../config/keys");
const { check } = require("express-validator");

// Load User model
const { User } = require("../../sequelize");
const Token = require("../../models/Token");

const { notFound, checkForErrors } = require("../../helpers");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  [
    check("email", "Email is required")
      .not()
      .isEmpty()
      .normalizeEmail(),
    check("email", "Please include a valid email")
      .isEmail()
      .normalizeEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    check("confirmPassword", "Please enter a password")
      .not()
      .isEmpty()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      })
  ],
  asyncHandler(async (req, res) => {
    let errors = await checkForErrors(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findAll({ where: { email } });
    console.log();
    if (user.length > 0) {
      return userAlreadyExists(res);
    } else {
      const newUser = await User.create({ name, email, password });

      // const token = await Token.create(newUser);
      // await token.save();

      // await newUser.updatePassword(password);
      // await newUser.save();

      console.log(newUser);

      // TODO: Catch potential error
      const mailjetEmail = await sendWelcomeEmail(name, email, req, token);

      res.json(newUser);
    }
  })
);

// @route   POST api/users/login
// @desc    Login user & return JWT
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email")
      .isEmail()
      .normalizeEmail(),
    check("password", "Please enter a password")
      .not()
      .isEmpty()
  ],
  asyncHandler(async (req, res) => {
    let errors = await checkForErrors(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await User.findByEmail(email);
    if (!user) {
      return invalidCredentials(res);
    }

    if (!user.isVerified) {
      return userNotVerified(res);
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      const payload = setJWTPayload(user);

      createAndSendJWT(payload, res);
    } else {
      return invalidCredentials(res);
    }
  })
);

// @route   POST api/users/login
// @desc    Login user & return JWT
// @access  Public
router.patch(
  "/:userId",
  passport.authenticate("jwt", {
    session: false
  }),
  [
    check("name", "Please enter a name")
      .not()
      .isEmpty()
  ],
  asyncHandler(async (req, res) => {
    let errors = await checkForErrors(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findById(req.params.userId);
    await user.updateName(req.body.name);
    if (!!req.body.currentPassword && !!req.body.newPassword && !!req.body.confirmNewPassword) {
      await user.updatePassword(
        req.body.currentPassword,
        req.body.newPassword,
        req.body.confirmNewPassword
      );
    }

    await user.save();

    createAndSendJWT(setJWTPayload(user), res);
  })
);

// @route   POST api/users/login
// @desc    Login user & return JWT
// @access  Public
router.delete(
  "/:userId",
  passport.authenticate("jwt", {
    session: false
  }),
  hasRole(["admin"]),
  asyncHandler(async (req, res) => {
    let errors = await checkForErrors(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await User.findByIdAndRemove(req.params.userId);
    res.json({ users: await User.all() });
  })
);

// @route   POST api/users/forgot_password
// @desc    Lets user request a reset password link
// @access  Public
router.post(
  "/forgot_password",
  [
    check("email", "Please include a valid email")
      .isEmail()
      .normalizeEmail()
  ],
  asyncHandler(async (req, res) => {
    let errors = await checkForErrors(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByEmail(req.body.email);
    const existingToken = await Token.findOne({ _userId: user._id });
    if (!existingToken) {
      const token = await createToken(user);
      token.save();
      await sendForgotPasswordEmail(user.name, user.email, req, token);
    }

    res.sendStatus(200);
  })
);

// @route   POST api/users/reset_password/:token
// @desc    Reset user password using unique token
// @access  Public
router.post(
  "/reset_password/:token",
  [
    check("password", "Please enter a password")
      .not()
      .isEmpty(),
    check("confirmPassword", "Please enter a password")
      .not()
      .isEmpty()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      })
  ],
  asyncHandler(async (req, res) => {
    let errors = await checkForErrors(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      return notFound(res);
    } else {
      const user = await User.findById(token._userId);

      await user.updatePassword(password);
      await token.remove();
      await user.save();

      res.sendStatus(200);
    }
  })
);

// @route   GET api/users/reset_password/:token
// @desc    See if reset_password token is valid
// @access  Public
router.get(
  "/reset_password/:token",
  asyncHandler(async (req, res) => {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      return notFound(res);
    } else {
      res.sendStatus(200);
    }
  })
);

// @route   POST api/users/confirm/:token
// @desc    Confirm user registration
// @access  Public
router.get(
  "/confirm/:token",
  asyncHandler(async (req, res) => {
    const { token } = req.params;
    let userToken = await Token.findOne({ token });
    if (!userToken) {
      return notFound(res);
    }

    let user = await User.findOne({ _id: userToken._userId });
    if (!user) {
      return notFound(res);
    }

    if (user.isVerified) {
      return alreadyVerified(res);
    }

    await user.setVerified();
    await userToken.remove();
    await user.save();
    res.json("Account activated");
  })
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  hasRole(["admin"]),
  asyncHandler(async (req, res) => {
    res.json({
      users: await User.all()
    });
  })
);

const createNewUser = async (name, email, password) => {
  return await new User({
    name,
    email,
    password
  });
};

const userAlreadyExists = res => {
  return res.status(400).json({ errors: [{ msg: "User already exists" }] });
};

const invalidCredentials = res => {
  return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
};

const userNotVerified = res => {
  return res.status(400).json({ errors: [{ msg: "User not verified" }] });
};

const alreadyVerified = res => {
  return res.status(400).json({ errors: [{ msg: "Already verified" }] });
};

const createToken = user => {
  return new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex")
  });
};

const sendWelcomeEmail = async (name, email, req, token) => {
  return await Mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "info@octopus.io",
          Name: "Octopus"
        },
        To: [
          {
            Email: email,
            Name: name
          }
        ],
        TemplateID: 875599,
        TemplateLanguage: true,
        Subject: "Octopus Confirmation",
        Variables: {
          name: name,
          token: `http://${req.headers.host}/confirm_account/${token.token}`
        }
      }
    ]
  });
};

const sendForgotPasswordEmail = async (name, email, req, token) => {
  return await Mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "inf@octopus.io",
          Name: "Octopus"
        },
        To: [
          {
            Email: email,
            Name: name
          }
        ],
        TemplateID: 908232,
        TemplateLanguage: true,
        Subject: "Octopus Password Reset",
        Variables: {
          name: name,
          token: `http://${req.headers.host}/reset_password/${token.token}`
        }
      }
    ]
  });
};

function createAndSendJWT(payload, res) {
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 3600
    },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    }
  );
}

function setJWTPayload(user) {
  return {
    id: user.id,
    name: user.name,
    role: user.role
  };
}

module.exports = router;
