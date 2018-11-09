import express from 'express';
import { validateBody } from '../middleware/ajv';
import authHandlers from '../../handler/auth';

export const authRoute = express.Router();

// List routers of auth api should be define in array routers
const routers = [
  /**
    * This function to authenticate user
    * @route POST /login
    * @group auth - Operations about authenticate
    * @param {string} account.body.required - username or email
    * @param {string} password.body.required - user's password.
    * @returns {object} 200 - An array of user info
    * @returns {Error}  default - Unexpected error
  */
  '/login',
  /**
    * This function comment is parsed by doctrine
    * @route GET /api
    * @group auth - Operations about authenticate
    * @param {string} email.query.required - username or email
    * @param {string} password.query.required - user's password.
    * @returns {object} 200 - An array of user info
    * @returns {Error}  default - Unexpected error
  */
  '/register',
  '/change-password',
];

authRoute.post(routers, validateBody, authHandlers);