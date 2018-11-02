import { login } from './login.handler';
import { register } from './register.handler';

/**
 * Should be define an object with action, method, function handle action here
 */
const defineHandler = {
  login: {
    POST: login,
  },
  register: {
    POST: register,
  },
};

/**
 * @author Dung Vu Anh
 *
 * Function handler request, response for auth api
 * It's will detect what thing need to handle and pick function to handle it base on object 'defineHandler'
 * @param {Objec} req The request express object
 * @param {Object} res The response express object
 */
const authHandlers = async (req, res) => {
  const urlBase = req.url.split('/')[1];
  const method = req.method;
  const fn = defineHandler[urlBase][method];
  const result = await fn(req.body);

  return res.status(result.status).json(result);
};

export default authHandlers;