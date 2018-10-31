import express from 'express';
import logger from '../lib/common/logger';
import { verify } from './middleware/jwt';
import {
  bookRoute,
} from './router';

export const init = () => {
  const app = express();
  app.use(verify);
  app.use([
    bookRoute,
  ]);

  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    logger.info('LISTENNING AT 3000');
  });
};
