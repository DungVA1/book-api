import jwt from 'jsonwebtoken';

/**
 * @author Dung Vu Anh
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

/**
 * @author Dung Vu Anh
 * Decode token -> Pure data
 * @param {String} token Token signed by JWT
 * @return {Object} The object date was decoded
 */
export const decode = (token) => {
  return jwt.decode(token);
};

/**
 * @author Dung Vu Anh
 * The function to verify token from client provided is valid or invalid
 * @param {Object} req The request express object recieved from client
 * @param {Object} res The response express object will return to client
 * @param {Function} next The function if was called express will continue current process
 * @return {Statement} Return statement of request is valid or invalid
 */
export const verify = (req, res, next) => {
  const token = extractHeader(req);
  if (!token) {
    return res.json({
      status: 400,
      error: true,
      message: 'Token is required',
      messageCode: 'TOKEN_IS_REQUIRED',
    });
  }

  const tokenIsValid = jwt.verify(
    token,
    process.env.TOKEN_SECRET_KEY || '$_TOKEN_SECRET_KEY_DEFAULT_$'
  );

  if (!tokenIsValid) {
    return res.json({
      status: 401,
      error: true,
      message: 'Unauthorized',
      messageCode: 'UNAUTHORIZED',
    });
  }

  return next();
};

/**
 * @author Dung Vu Anh
 * Get token from header
 * @param {Object} req The express request
 */
const extractHeader = (req) => {
  return req.headers['x-access-token'] || req.headers['access-token'];
};