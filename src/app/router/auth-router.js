import express from 'express';
import { validateBody } from '../middleware/ajv';
import authHandlers from '../../handler/auth';

export const authRoute = express.Router();

// List routers of auth api should be define in array routers
const routers = [
  '/login',
  '/register',
  '/change-password',
];

authRoute.post(routers, validateBody, authHandlers);