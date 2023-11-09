import { DBError } from '@/utils/custom-error';
import { errorCode } from '@/utils/utils';
import { validator } from 'hono/validator';

export const validateSign = validator('json', (value) => {
  if (!value.email || !value.password) {
    throw new DBError('Email and password required', errorCode.INVALID);
  }
});
