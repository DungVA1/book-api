import 'babel-polyfill';
import { initExpressApi } from './app';
import logger from './lib/common/logger';
import ES from './lib/elasticsearch';
import './app/config/load-env';
import { validationSchemaLoader } from './app/middleware/ajv';

const es = new ES();
  es.checkConnection()
  .then(validationSchemaLoader)
  .then(initExpressApi)
  .catch(logger.error);
