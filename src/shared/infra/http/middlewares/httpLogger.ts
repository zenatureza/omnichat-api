import morgan, { StreamOptions } from 'morgan';

import ILogProvider from '@shared/infra/providers/LogProvider/interfaces/ILogProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
class HttpLogger {
  private stream: StreamOptions;
  private messageFormat =
    ':method :url :status :res[content-length] - :response-time ms';

  constructor(
    @inject('LogProvider')
    private logProvider: ILogProvider,
  ) {
    this.setup();
  }

  private setup() {
    this.stream = {
      write: message => this.logProvider.http(message),
    };
  }

  // Only displays in development
  private skip() {
    const env = process.env.NODE_ENV || 'development';

    return env !== 'development';
  }

  // Called once in server.ts to build the middleware
  public getHttpLoggerHandler() {
    const httpLogger = morgan(this.messageFormat, {
      stream: this.stream,
      skip: this.skip,
    });

    return httpLogger;
  }

  // Returns the implementation of ILogProvider
  public getLogger() {
    return this.logProvider;
  }
}

export default HttpLogger;
