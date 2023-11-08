import { DBError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { validator } from 'hono/validator';

export const validateUserId = validator('param', (value) => {
    console.log(value,value.id,+value.id)
    if (isNaN(+value.id)) {
      throw new DBError('UserId should be a number.', errorCode.INVALID);
    }
  })

