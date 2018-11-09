import express from 'express';
import cors from 'cors';
import logger from '../lib/common/logger';
import { verify } from './middleware/jwt';
import {
  bookRoute,
  userRoute,
  authRoute,
} from './router';
import packageJson from '../../package.json';
import expressSwagger from 'express-swagger-generator';

const baseUrl = process.env.BASE_URL || '/api';
const version = `v${(packageJson.version.split('.')[0] || 1)}`;
let options = {
  swaggerDefinition: {
      info: {
          description: 'This is blog document api swagger',
          title: 'Swagger',
          version: packageJson.version,
      },
      host: 'localhost:3000',
      basePath: `${baseUrl}/${version}`,
      produces: [
          'application/json',
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'x-access-token',
              description: '',
          },
      },
  },
  basedir: __dirname, //app absolute path
  files: ['./router/*.js'], //Path to the API handle folder
};

export const initExpressApi = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(/^((?!login|register).)*$/, verify);
  app.use(`${baseUrl}/${version}`, [
    bookRoute,
    userRoute,
    authRoute,
  ]);
  expressSwagger(app)(options);
  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    logger.info('LISTENNING AT 3000');
  });
};
