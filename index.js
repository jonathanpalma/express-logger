const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressWinston = require("express-winston");
const faker = require("faker");
const winston = require("winston");

// logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      stringify: false,
      json: true,
      timestamp: true,
      prettyPrint: true,
      humanReadableUnhandledException: true,
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// logger middleware
const requestLogger = (logger) => {
  expressWinston.requestWhitelist.push("body");
  expressWinston.responseWhitelist.push("body");
  return expressWinston.logger({ winstonInstance: logger });
};

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger(logger));

app.post("/interactions", (req, res) => {
  const updatedAt = new Date().toISOString();
  return res.send({
    updatedAt,
    shouldAlert: faker.random.boolean(),
  });
});

app.listen(port, () => console.log(`Example app listening at :${port}`));
