const { body } = require("express-validator");
const userModel = require("../models/userModel");

const validateSignup = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("'Please fill in this field'")
    .isLength({ min: 3 })
    .withMessage("'Must have min. 3 characters'"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("'Please fill in this field'")
    .isLength({ min: 3 })
    .withMessage("'Must have min. 3 characters'"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("'Please fill in this field'")
    .isLength({ min: 3 })
    .withMessage("'Must have min. 3 characters'")
    .custom(async (value) => {
      const user = await userModel.findUserByUsername(value);
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
    .custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("'Passwords don't match'");
      }
      return true;
    }),
];

module.exports = validateSignup;
