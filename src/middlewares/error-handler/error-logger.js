const logger = require('../../lib/logger');

const errorLogger = (req, error) => {
  logger.error('Error on processing the next request');
  logger.error({
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  });
  logger.error(error.stack || error);
};

module.exports = errorLogger;
