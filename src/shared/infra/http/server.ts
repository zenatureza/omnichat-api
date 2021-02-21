import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';
import { container } from 'tsyringe';
import HttpLogger from './middlewares/httpLogger';
const httpLogger = container.resolve(HttpLogger);

const app = express();

app.use(express.json());
app.use(httpLogger.getHttpLoggerHandler());

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    httpLogger.getLogger().error(err.message);

    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  httpLogger.getLogger().error(err.message);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🪴 Server running on port ${port}`);
});
