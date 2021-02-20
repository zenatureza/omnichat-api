import winston from 'winston';

import ILogProvider from '../interfaces/ILogProvider';
import loggerConfig from '@config/logger';

class WinstonLogProvider implements ILogProvider {
  private logger: winston.Logger;

  constructor() {
    this.setup();
  }

  private setup() {
    // Only shows warns and errors in production, in dev show all
    const level = () => {
      const env = process.env.NODE_ENV || 'development';
      const isDevelopment = env === 'development';

      return isDevelopment ? 'debug' : 'warn';
    };

    winston.addColors(loggerConfig.colors);

    const format = winston.format.combine(
      winston.format.timestamp({ format: loggerConfig.format.timestamp }),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    );

    const transports = [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: loggerConfig.files.error,
        level: 'error',
      }),
      new winston.transports.File({ filename: loggerConfig.files.all }),
    ];

    this.logger = winston.createLogger({
      level: level(),
      levels: loggerConfig.levels,
      format,
      transports,
    });
  }

  error(message: string): void {
    this.logger.error(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  info(message: string): void {
    this.logger.info(message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
  http(message: string): void {
    this.logger.http(message);
  }
}

export default WinstonLogProvider;
