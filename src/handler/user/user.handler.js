import { insert } from '../../repository/user-model';
import ES from '../../lib/elasticsearch/index';

export const getAllUsers = async () => {
  const els = new ES();
  const alive = await els.checkConnection();

  return {
    data: alive,
    status: 200,
  };
};

export const insertUser = (body) => {
  insert(body);

  return {
    status: 200,
  };
};