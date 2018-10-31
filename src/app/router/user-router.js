import express from 'express';

export const userRoute = express.Router();

userRoute.get('/users', (req, res) => {
  res.send('GET /users api');
});

userRoute.post('/users', (req, res) => {
  res.send('POST /users api');
});

userRoute.put('/users', (req, res) => {
  res.send('PUT /users api');
});

userRoute.patch('/users', (req, res) => {
  res.send('PATCH /users api');
});

userRoute.delete('/users', (req, res) => {
  res.send('DELETE /users api');
});
