import express from 'express';
import { validateBody } from '../middleware/ajv';
import userHandlers from '../../handler/user';

export const userRoute = express.Router();

// List routers of auth api should be define in array routers
const routers = [
  '/users',
];

userRoute.post(routers, validateBody, userHandlers);
userRoute.get(routers, userHandlers);