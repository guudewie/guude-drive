const asyncHandler = require("express-async-handler");

const getMainPage = asyncHandler((req, res, next) => {
  res.render("./partials/main", { layout: "./layout" });
});

module.exports = { getMainPage };
