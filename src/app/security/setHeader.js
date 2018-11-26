export const setHeader = (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', 'localhost:3000'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
  if (req.method.toUpperCase() === 'OPTIONS') {
    return res.status(200).end();
  }

  return next();
};