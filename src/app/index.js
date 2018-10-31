import express from 'express';
import logger from '../../src/lib/common/logger';
import {
  bookRoute,
} from './router';

export const init = () => {
  const app = express();
  app.use([
    bookRoute,
  ]);

  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    logger.info('LISTENNING AT 3000');
  });
};
