const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "dd|MM|yyyy\tHH:mm:ss")}`;
  const logItem = `Date & Time: ${dateTime}\tRequest ID: ${uuid()}\t${message}\n`;

  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(
    `Method: ${req.method}\t Request Origin: ${req.headers.origin}\tRequest URL Endpoint: ${req.url}`,
    "request_logs.txt"
  );

  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
