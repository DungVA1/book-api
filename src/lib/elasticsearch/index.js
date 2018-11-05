import elasticsearch from 'elasticsearch';
import logger from '../common/logger';
import exceptionError from '../../constant/common/exception';

const handleESException = (error) => {
  logger.error(`[${__dirname}/index.js]: ${JSON.stringify(error)}`);

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

  async closeConnection () {
    this.connection.close();
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
    this.closeConnection();

    return response;
  }

  async update (id, body) {
    try {
      this.ESBody = Object.assign({
        id,
        body,
        refresh: 'wait_for',
      }, this.ESBody);

      const { result } = await this.connection.update(this.ESBody);

      return {
        status: 200,
        message: result === 'noop' ? 'nothing to changed' : 'updated',
        id,
      };
    } catch (err) {
      return handleESException(err);
    }
  }

  async remove (id) {
    try {
      this.ESBody = Object.assign({
        id,
        refresh: 'wait_for',
      }, this.ESBody);

      const { result } = await this.connection.delete(this.ESBody);

      return {
        status: 200,
        message: result,
        id,
      };
    } catch (err) {
      return handleESException(err);
    }
  }

  async getById (id) {
    try {
      this.ESBody = Object.assign({
        id,
      }, this.ESBody);

      const { _source, _version } = await this.connection.get(this.ESBody);

      return {
        status: 200,
        data: _source,
        id,
        version: _version,
      };
    } catch (err) {
      return handleESException(err);
    }
  }

  async getList (filter, sort, from = 0, size = 20) {
    try {
      this.ESBody = Object.assign({
        body: filter,
        sort,
        from,
        size,
        scroll: '5m',
      }, this.ESBody);
      const result = await this.connection.search(this.ESBody);

      return {
        status: 200,
        data: result.hits.hits,
        total: result.hits.total,
      };
    } catch (err) {
      return handleESException(err);
    }
  }

  async scroll (scrollId) {
    try {
      this.ESBody = Object.assign({
        scroll: '5m',
        scrollId,
      }, this.ESBody);
      const result = await this.connection.scroll(this.ESBody);

      if (!result.hits.total) {
        this.connection.clearScroll(scrollId);
      }

      return {
        status: 200,
        data: result.hits.hits,
        total: result.hits.total,
      };
    } catch (err) {
      return handleESException(err);
    }
  }

  async getCount () {
    try {
      const { count } = await this.connection.count(this.ESBody);

      return {
        status: 200,
        data: count,
      };
    } catch (err) {
      return handleESException(err);
    }
  }
}