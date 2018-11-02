import AJV from 'ajv';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import logger from '../../lib/common/logger';
import { UNPROCESSABLE_ENTITY, EXCEPTION } from '../../constant/common/error-message';
import { statusCode } from '../../constant/common/status-code';
import definition from '../schema/definition.json';
import exception from '../../constant/common/exception';

/**
 * @author Dung Vu Anh
 *
 * This function is a middleware can validate request data body base on schema validation
 * @param {Object} req The request express
 * @param {Object} res The response express
 * @param {Function} next The express function next process
 * Response error imediate if body invalid or next process if valid
 */
export const validateBody = async (req, res, next) => {
  try {
    const urlBase = req.url.split('/')[1];
    const method = req.method;
    if (method.toUpperCase() === 'GET') {
      return next();
    }
    const schemaFileName = _.get(definition, [urlBase, method]);
    const schemaDefinitions = _.get(definition, [urlBase, 'definitions']);
    if (!schemaFileName) {
      logger.error(`[${__dirname}/ajv.js]: Request to ${method} ${req.url} need to validate body but have not defined schema yet`);

      return res.status(statusCode.EXCEPTION).json({
        status: statusCode.EXCEPTION,
        error: true,
        message: EXCEPTION,
        messageCode: 'EXCEPTION',
      });
    }
    const schemaObj = await fs.readFile(path.resolve(
      __dirname,
      `../schema/${schemaFileName}`
    ), 'utf8');
    const ajv = new AJV({ allErrors: true });
    // Load defintions related
    if (schemaDefinitions && schemaDefinitions.length) {
      const promises = schemaDefinitions.map((def) => {
        return fs.readFile(path.resolve(
          __dirname,
          `../schema/${def}`
        ), 'utf8');
      });

      const definitions = await Promise.all(promises);
      definitions.forEach((def) => {
        ajv.addSchema(JSON.parse(def));
      });
    }
    // Validate body
    const valid = ajv.validate(JSON.parse(schemaObj), req.body);
    if (!valid) {
      return res.status(statusCode.UNPROCESSABLE_ENTITY).json({
        status: statusCode.UNPROCESSABLE_ENTITY,
        error: true,
        message: UNPROCESSABLE_ENTITY,
        messageCode: 'UNPROCESSABLE_ENTITY',
        body: ajv.errors,
      });
    }

    next();
  } catch (ex) {
    logger.error(`[${__dirname}/ajv.js]: ${ex}`);
    res.status(statusCode.EXCEPTION).json(exception);
  }
};