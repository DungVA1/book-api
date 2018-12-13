import express from 'express';
import { validateBody } from '../middleware/ajv';
import { login, register } from '../../handler/auth';

export const authRoute = express.Router();

authRoute.post('/login/:id', validateBody, login);
authRoute.post('/register', validateBody, register);