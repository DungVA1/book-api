import 'babel-polyfill';
import { initExpressApi } from './app';
import logger from './lib/common/logger';
import ES from './lib/elasticsearch';
import './app/config/load-env';

const es = new ES();
es.checkConnection().then(r => {
  if (!r.error) {
    logger.info('Elasticsearch started successfully');
    initExpressApi();
  } else {
    logger.error('Elasticsearch starting failed');
  }
});
