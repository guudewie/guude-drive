const { body } = require("express-validator");
const userModel = require("../models/userModel");

const validateSignup = [
  body("firstname")
    .trim()
    .isEmpty()
    .withMessage("'Please fill in this field'")
    .isLength({ min: 3 })
    .withMessage("'Must have min. 3 characters'"),
  body("lastname")
    .trim()
    .isEmpty()
    .withMessage("'Please fill in this field'")
    .isLength({ min: 3 })
    .withMessage("'Must have min. 3 characters'"),
  body("username")
    .trim()
    .custom(async (value) => {
      const user = userModel.findUserByUsername(value);
      if (user) {
        throw new Error("'Username already taken'");
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("'Password must be min 8 characters'")
    .custom((value) => {
      if (!/\d/.test(value)) {
        throw new Error("'Password must contain a number'");
      }
      return true;
    }),
  body("confirm_password")
    .trim()
    .custom((value) => {
      if (req.body.password !== value) {
        throw new Error("'Passwords don't match'");
      }
      return true;
    }),
];

module.exports = validateSignup;
