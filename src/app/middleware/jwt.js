import jwt from 'jsonwebtoken';

/**
 * Generate a token
 * @param {Object} data Object data to sign in token
 * @return {String} This is token after signed
 */
export const signToken = (data) => {
  return jwt.sign(
    data,
    process.env.TOKEN_SECRET_KEY || '$_TOKEN_SECRET_KEY_DEFAULT_$',
    {
      expiresIn: parseInt(process.env.TOKEN_EXPIRY_TIME, 10) * 60,
    }
  );
};