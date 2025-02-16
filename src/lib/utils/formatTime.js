const { format } = require("date-fns");

const formatDate = (date) => {
  return format(date, "MMM d, y");
};

module.exports = formatDate;
