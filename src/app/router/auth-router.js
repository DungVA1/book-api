import express from 'express';
import { validateBody } from '../middleware/ajv';
import authHandlers from '../../handler/auth';

export const authRoute = express.Router();

authRoute.get('/register/:id', validateBody, (req, res) => {
  res.send('GET /register api');
});

authRoute.post('/login', validateBody, authHandlers);
