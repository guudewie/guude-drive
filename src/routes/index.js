const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authController = require("../controllers/auth");
const mainController = require("../controllers/main");

// GET - main page
router.get("/", authenticate, mainController.getMainPage);

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

/************ LOGOUT ******************/

// GET /logout - logout user
router.get("/logout", authController.logout);

module.exports = router;
