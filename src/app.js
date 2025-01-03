require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const expressSession = require("./config/session");
const path = require("node:path");
const passport = require("passport");
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Passport configuration
require("./config/passport");

// view engine setup
//app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);
//app.use(passport.session());

// Custom Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);

// Start server
app.listen(PORT, () => console.log(`Running... listening on Port ${PORT}`));
