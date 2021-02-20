export default {
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  },
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  files: {
    error: process.env.LOGGER_ERRORS_FILE || 'logs/error.log',
    all: process.env.LOGGER_ALL_FILE || 'logs/all.log',
  },
  format: {
    timestamp: 'YYYY-MM-DD HH:mm:ss:ms',
  },
};
