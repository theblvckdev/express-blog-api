const { logEvents } = require("./log_events_middleware");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "error_logs.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
