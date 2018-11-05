import { insert } from '../../model/user-model';

export const register = (body) => {
  insert(body);

  return {
    status: 200,
    messageCode: 'REGISTER_SUCCESSFULLY',
  };
};