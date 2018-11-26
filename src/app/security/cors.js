
// Define domains can access to server
const whiteListOrigin = ['localhost:3000'];

export const corsOption = {
  origin: (origin, cb) => {
    if (whiteListOrigin.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb('Not allowed by CORS');
    }
  },
};
