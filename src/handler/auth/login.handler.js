import { signToken } from '../../app/middleware/jwt';
import { statusCode } from '../../constant/common/status-code';
import { LOGIN_FAILED, LOGIN_SUCCESSFULLY } from '../../constant/common/error-message';

/**
 * @author Dung Vu Anh
 *
 * The function handle login request
 * @param {Object} body The login body request. Always contain 2 fields userName, password
 */
export const login = async (body) => {
  const { userName, password } = body;
  if (userName === 'admin' && password === '123456') {
    return {
      status: statusCode.SUCCESS,
      error: false,
      message: LOGIN_SUCCESSFULLY,
      messageCode: 'LOGIN_SUCCESSFULLY',
      token: signToken(body),
    };
  } else {
    return {
      status: statusCode.UNAUTHORIZE,
      error: true,
      message: LOGIN_FAILED,
      messageCode: 'LOGIN_FAILED',
    };
  }
};