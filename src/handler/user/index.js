import { getAllUsers, insertUser } from './user.handler';

/**
 * Should be define an object with action, method, function handle action here
 */
const defineHandler = {
  users: {
    GET: getAllUsers,
    POST: insertUser,
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
const userHandlers = async (req, res) => {
  const urlBase = req.url.split('/')[1];
  const method = req.method;
  const fn = defineHandler[urlBase][method];
  const result = await fn(req.body, req.params, req.query);

  return res.status(result.status).json(result);
};

export default userHandlers;