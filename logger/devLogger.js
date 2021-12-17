const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, json } = format;

const devLogger = () => {
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      });
    
    return createLogger({
        level: 'debug',
        // format: winston.format.simple(),
        format: combine(
            format.colorize(),
            timestamp({format: "HH:mm:ss"}),
            myFormat
          ),
        transports: [
            new transports.Console(),
        ],
      });
}

  module.exports = devLogger;