import 'babel-polyfill';
import { initExpressApi } from './app';
import logger from './lib/common/logger';
import ES from './lib/elasticsearch';
const es = new ES();
es.checkConnection().then(r => {
  if (r) {
    logger.info('Elasticsearch started successfully');
    initExpressApi();
  } else {
    logger.error('Elasticsearch starting failed');
  }
});
