const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { createUser } = require("../models/userModel");
const validateSignup = require("../middleware/validateSignup");

const getLoginForm = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }

  // save and clear error message
  const error = req.session.messages || [];
  req.session.messages = [];

  res.render("./partials/login", { layout: "./layoutAuth", error: error });
});

const login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
  successRedirect: "/",
});

const getSignupForm = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }

  res.render("./partials/signup", {
    layout: "./layoutAuth",
    errors: {},
    formData: {},
  });
});

const signup = [
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("partials/signup", {
        formData: req.body,
        errors: errors.mapped(),
        layout: "./layoutAuth",
      });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) next(err);

      await createUser(
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        hashedPassword
      );
    });

    res.redirect("/login");
  }),
];

const logout = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = {
  getLoginForm,
  login,
  getSignupForm,
  signup,
  logout,
};
