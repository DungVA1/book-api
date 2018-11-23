import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import logger from '../lib/common/logger';
import { verify } from './middleware/jwt';
import {
  bookRoute,
  userRoute,
  authRoute,
} from './router';
import packageJson from '../../package.json';

const baseUrl = process.env.BASE_URL || '/api';
const version = `v${(packageJson.version.split('.')[0] || 1)}`;

export const initExpressApi = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(/^((?!login|register).)*$/, verify);
  app.use(`${baseUrl}/${version}`, [
    bookRoute,
    userRoute,
    authRoute,
  ]);
  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    logger.info('LISTENNING AT 3000');
  });
};
