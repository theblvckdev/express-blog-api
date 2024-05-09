const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "dd|MM|yyyy\tHH:mm:ss")}`;
  const logTime = `${dateTime}\tRequest ID${uuid()}\t${message}\n`;

  console.log(logTime);

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
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "request_logs.txt"
  );

  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
