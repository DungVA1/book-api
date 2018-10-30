import express from 'express';

export const bookRoute = express.Router();

bookRoute.get('/books', (req, res) => {
  res.send('Books api');
});