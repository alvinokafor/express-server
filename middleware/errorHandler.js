const { logEvents } = require("./logEvents");

function errorHandler(err, req, res, next) {
  logEvents(`${err.name}: ${err.message}`, "error_log.txt");
  res.status(500).send(err.message);
}

module.exports = errorHandler;
