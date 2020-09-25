import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.statusCode);
      response.json({
        status: 'error',
        message: error.message,
      });
    } else {
      console.error(error.stack);

      response.status(500);
      response.json({
        status: 'error',
        message: 'Internal server error',
      });
    }

    next(error);
  },
);

app.listen(3333, () => console.log('Server launched on port 3333! 🚀'));
