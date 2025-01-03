const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { createUser } = require("../models/userModel");

const getLoginForm = asyncHandler(async (req, res, next) => {
  res.render("./login");
});

const login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
  successRedirect: "/",
});

const getSignupForm = asyncHandler(async (req, res, next) => {
  res.render("./signup");
});

const signup = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) next(err);
    await createUser({
      username: req.body.username,
      password: hashedPassword,
    });
  });

  res.redirect("/login");
});

module.exports = {
  getLoginForm,
  login,
  getSignupForm,
  signup,
};
