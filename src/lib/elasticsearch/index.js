import elasticsearch from 'elasticsearch';
import logger from '../common/logger';
import exceptionError from '../../constant/common/exception';

const handleESException = (error) => {
  logger.error(`[${__dirname}/index.js]: ${JSON.stringify(error)}`);

  return exceptionError;
};

export default class ElasticSearchORM {
  constructor (index, type) {
    this.connection = new elasticsearch.Client({
      host: `${process.env.ES_HOST || 'localhost'}:9200`,
    });
    this.ESBody = {
      index,
      type,
    };
  }

  async insert (body) {
    try {
      this.ESBody = Object.assign({
        body,
        refresh: 'wait_for',
      }, this.ESBody);

      const { _id, result } = await this.connection.index(this.ESBody);

      return {
        status: 201,
        message: result,
        id: _id,
      };
    } catch (err) {
      return handleESException(err);
    }
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

  async delete (id) {
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
}