const fs = require("fs");
const fsPromises = require("fs").promises;
const crypto = require("crypto");
const path = require("path");

async function logEvents(message, log_file_name) {
  const date_time = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "short",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date());

  const log_content = `${date_time}\t${crypto.randomUUID()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", log_file_name),
      log_content
    );
  } catch (error) {
    console.log(error);
  }
}

const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "request_log.txt"
  );
  next();
};

module.exports = { logger, logEvents };
