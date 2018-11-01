import express from 'express';
import { signToken } from '../middleware/jwt';
import { validateBody } from '../middleware/ajv';

export const authRoute = express.Router();

authRoute.get('/register/:id', validateBody, (req, res) => {
  res.send('GET /register api');
});

authRoute.post('/login', validateBody, (req, res) => {
  const response = {
    status: 200,
    error: false,
    message: 'Login successfully',
    messageCode: 'LOGIN_SUCCESSFULLY',
    token: signToken(req.body),
  };
  res.json(response);
});
