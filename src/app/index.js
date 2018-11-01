import express from 'express';
import cors from 'cors';
import logger from '../lib/common/logger';
import { verify } from './middleware/jwt';
import {
  bookRoute,
  userRoute,
  authRoute,
} from './router';

export const init = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(/^((?!login|register).)*$/, verify);
  app.use([
    bookRoute,
    userRoute,
    authRoute,
  ]);

  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    logger.info('LISTENNING AT 3000');
  });
};
