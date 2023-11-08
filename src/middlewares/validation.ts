import { DBError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { validator } from 'hono/validator';

export const validateUserId = async() => {
  validator('param', (value) => {
    if (isNaN(+value.id)) {
      throw new DBError('UserId should be a number.', errorCode.INVALID);
    }
    return value;
  })
};
