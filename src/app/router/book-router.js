import express from 'express';

export const bookRoute = express.Router();

bookRoute.get('/books', (req, res) => {
  res.send('GET /books api');
});

bookRoute.post('/books', (req, res) => {
  res.send('POST /books api');
});

bookRoute.put('/books', (req, res) => {
  res.send('PUT /books api');
});

bookRoute.patch('/books', (req, res) => {
  res.send('PATCH /books api');
});

bookRoute.delete('/books', (req, res) => {
  res.send('DELETE /books api');
});
