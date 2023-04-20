const { createLogger, transports, format } = require("winston");

const { combine, timestamp, label, printf } = format;
const CATEGORY = "winston custom format";

// //Using the printf format.
// const customFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });



const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
        format: "MMM-DD-YYYY HH:mm:ss",
      }),
      prettyPrint()
    ),
  //logger method...
  transports: [
    //new transports:
    new transports.File({
      filename: "./logs.log",
    }),
  ],
  //...
});

module.exports = logger;