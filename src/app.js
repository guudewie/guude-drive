require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const expressSession = require("./config/session");
const passport = require("passport");

const path = require("node:path");

const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Passport configuration
require("./config/passport");

// view engine setup
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.session());

// Custom Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);

// Error handling middleware for server-side rendering
app.use((err, req, res, next) => {
  // Log the error
  console.error("Error:", err);

  // Set appropriate status code
  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "development"
      ? err.message || "Something went wrong!"
      : "Something went wrong!";

  const errorDetails =
    process.env.NODE_ENV === "development" ? { stack: err.stack } : {};

  return res.status(statusCode).render("./partials/error", {
    message,
    statusCode,
    ...errorDetails,
  });
});

// Start server
app.listen(PORT, () => console.log(`Running... listening on Port ${PORT}`));
