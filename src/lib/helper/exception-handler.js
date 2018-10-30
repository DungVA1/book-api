import { EXCEPTION_ERROR } from '../../constant/common/error-message';

export const exceptionHandler = () => {
  return {
    error: true,
    statusCode: 500,
    message: EXCEPTION_ERROR,
    messageCode: 'EXCEPTION_ERROR',
  };
};