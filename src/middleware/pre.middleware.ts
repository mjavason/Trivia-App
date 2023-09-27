import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CORS_ORIGIN } from '../constants';

function PreMiddleware(app: express.Application) {
  // Middleware to enable CORS
  app.use(cors());

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

  //CORS RESTRICTED
  // app.use(
  //   cors({
  //     origin: CORS_ORIGIN,
  //     credentials: true,
  //   }),
  // );

  app.use(helmet());

  return app;
}

export default PreMiddleware;
