import elasticsearch from 'elasticsearch';
import logger from '../common/logger';
import exceptionError from '../../constant/common/exception';

const handleESException = (error) => {
  logger.error(`[${__dirname}/index.js ]: ${JSON.stringify(error)}`);

  return exceptionError;
};

export default class ElasticSearch {
  constructor (index, type) {
    this.connection = new elasticsearch.Client({
      host: `${process.env.ES_HOST || 'localhost'}:9200`,
    });
    this.ESBody = {
      index,
      type,
    };
  }

  async checkConnection () {
    let response;
    logger.info('Check health of elasticsearch');
    try {
      response = await this.connection.ping();
      logger.info('Elasticsearch is connected');
    } catch (err) {
      throw `Elasticsearch ${err.message}`;
    }
    await this.closeConnection();

    return response;
  }

  async closeConnection () {
    await this.connection.close();
  }

  async insert (body) {
    let response;
    try {
      this.ESBody = Object.assign({
        body,
        refresh: 'wait_for',
      }, this.ESBody);

      const { _id, result } = await this.connection.index(this.ESBody);

      response = {
        status: 201,
        message: result,
        id: _id,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }

  async update (id, body) {
    let response;
    try {
      this.ESBody = Object.assign({
        id,
        body,
        refresh: 'wait_for',
      }, this.ESBody);

      const { result } = await this.connection.update(this.ESBody);

      response = {
        status: 200,
        message: result === 'noop' ? 'nothing to changed' : 'updated',
        id,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }

  async remove (id) {
    let response;
    try {
      this.ESBody = Object.assign({
        id,
        refresh: 'wait_for',
      }, this.ESBody);

      const { result } = await this.connection.delete(this.ESBody);

      response = {
        status: 200,
        message: result,
        id,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }

  async getById (id) {
    let response;
    try {
      this.ESBody = Object.assign({
        id,
      }, this.ESBody);

      const { _source, _version } = await this.connection.get(this.ESBody);

      response = {
        status: 200,
        data: _source,
        id,
        version: _version,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }

  async getList (filter, sort, from = 0, size = 20) {
    let response;
    try {
      this.ESBody = Object.assign({
        body: filter,
        sort,
        from,
        size,
        scroll: '5m',
      }, this.ESBody);
      const result = await this.connection.search(this.ESBody);

      response = {
        status: 200,
        data: result.hits.hits,
        total: result.hits.total,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }

  async scroll (scrollId) {
    let response;
    try {
      this.ESBody = Object.assign({
        scroll: '5m',
        scrollId,
      }, this.ESBody);
      const result = await this.connection.scroll(this.ESBody);

      if (!result.hits.total) {
        this.connection.clearScroll(scrollId);
      }

      response = {
        status: 200,
        data: result.hits.hits,
        total: result.hits.total,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }

  async getCount () {
    let response;
    try {
      const { count } = await this.connection.count(this.ESBody);

      response = {
        status: 200,
        data: count,
      };
    } catch (err) {
      response = handleESException(err);
    }
    await this.closeConnection();

    return response;
  }
}