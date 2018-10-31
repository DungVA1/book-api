import express from 'express';
import { signToken } from '../middleware/jwt';

export const authRoute = express.Router();

authRoute.get('/register', (req, res) => {
  res.send('GET /register api');
});

authRoute.post('/login', (req, res) => {
  const response = {
    status: 200,
    error: false,
    message: 'Login successfully',
    messageCode: 'LOGIN_SUCCESSFULLY',
    token: signToken(req.body),
  };
  res.json(response);
});
