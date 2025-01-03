const express = require("express");
const router = express.Router();

// GET - main page
router.get("/", (req, res) => {
  res.send("endpoint not implemented");
});

/**************************************/
/************* LOGIN ******************/
/**************************************/

// GET /login - render login page
router.get("/login", (req, res) => {
  res.send("endpoint not implemented");
});

// POST /login - login user
router.post("/login", (req, res) => {
  res.send("endpoint not implemented");
});

/**************************************/
/************ SIGNUP ******************/
/**************************************/

// GET /signup - render sign up page
router.get("/signup", (req, res) => {
  res.send("endpoint not implemented");
});

// POST /login - login user
router.post("/signup", (req, res) => {
  res.send("endpoint not implemented");
});

module.exports = router;
