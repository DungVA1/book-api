const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = '../../../log';

// Create the log directory if it does not exist
if (!fs.exists(logDir)) {
  fs.mkdir(logDir);
}

const filename = path.join(logDir);

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DDTHH:mm:ss',
    }),
    format.printf(info => `[${info.timestamp}][${info.level}]: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `[${info.timestamp}][${info.level}]: ${info.message}`
        )
      ),
    }),
    new transports.File({ filename }),
  ],
});

export default logger;
