import express from 'express';
import {
  bookRoute,
} from './router';

export const init = () => {
  const app = express();
  app.use([
    bookRoute,
  ]);

  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    console.log('LISTENNING AT 3000');
  });
};
