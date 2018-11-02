import AJV from 'ajv';
import fs from 'fs-extra';
import path from 'path';
import logger from '../../lib/common/logger';
import { UNPROCESSABLE_ENTITY } from '../../constant/common/error-message';
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
    const schemaFileName = definition[urlBase][method];
    const schemaObj = await fs.readFile(path.resolve(
      __dirname,
      `../schema/${schemaFileName}`
    ), 'utf8');
    const ajv = new AJV({ allErrors: true });
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
    logger.error(`[${__dirname}]: ${JSON.stringify(ex)}`);
    res.status(statusCode.EXCEPTION).json(exception);
  }
};