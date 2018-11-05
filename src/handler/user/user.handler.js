import { getAll, insert } from '../../repository/user-model';

export const getAllUsers = () => {
  return {
    status: 200,
    users: getAll(),
  };
};

export const insertUser = (body) => {
  insert(body);

  return {
    status: 200,
  };
};