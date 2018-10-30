import { EXCEPTION } from '../../constant/common/error-message';
import { statusCode } from '../../constant/common/status-code';

export const exceptionHandler = () => {
  return {
    error: true,
    statusCode: statusCode.EXCEPTION,
    message: EXCEPTION,
    messageCode: 'EXCEPTION',
  };
};