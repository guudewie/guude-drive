const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const authenticate = require("../middleware/authenticate");

// GET - main page
router.get("/", authenticate, (req, res) => {
  res.send(`Hello ${res.locals.currentUser.username}`);
});

/************* LOGIN ******************/

// GET /login - render login page
router.get("/login", authController.getLoginForm);

// POST /login - login user
router.post("/login", authController.login);

/************ SIGNUP ******************/

// GET /signup - render sign up page
router.get("/signup", authController.getSignupForm);

// POST /login - login user
router.post("/signup", authController.signup);

module.exports = router;
