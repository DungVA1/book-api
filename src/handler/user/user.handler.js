import { getAll } from '../../model/user-model';

export const getAllUsers = () => {
  return {
    status: 200,
    users: getAll(),
  };
};