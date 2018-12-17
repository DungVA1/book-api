import AJV from 'ajv';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import logger from '../../lib/common/logger';
import { UNPROCESSABLE_ENTITY } from '../../constant/common/error-message';
import { statusCode } from '../../constant/common/status-code';
import definition from '../schema/definition.json';
import exception from '../../constant/common/exception';

let ajv = new AJV({ allErrors: true });
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
    const urlBase = req.route.path;
    const method = req.method;
    if (method.toUpperCase() === 'GET') {
      return next();
    }
    const schemaId = _.get(definition, [urlBase, method]);
    // Validate body
    const valid = ajv.validate(schemaId, req.body);
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
    logger.error(`[${__dirname}/ajv.js ]: ${ex}`);
    res.status(statusCode.EXCEPTION).json(exception);
  }
};

export const validationSchemaLoader = async () => {
  const schemaFolder = path.resolve(__dirname, '../schema');
  const schemas = await fs.readdir(schemaFolder);
  schemas.forEach(schema => {
    if (schema !== 'definitions' && schema !== 'definition.json') {
      ajv.addSchema(require(`${schemaFolder}/${schema}`));
    }
  });
  const definitionSchemasFolder = path.resolve(__dirname, '../schema/definitions');
  const definitionSchemas = await fs.readdir(definitionSchemasFolder);
  definitionSchemas.forEach(defSchema => {
    ajv.addSchema(require(`${definitionSchemasFolder}/${defSchema}`));
  });
};