import { Context } from 'hono';
import { DBError, ValidationError } from './custom-error';
import { errorCode } from './utils';
import { formatZodError } from './error-formater';

export function DBErrorHandler(err: Error, c: Context) {
  if (err instanceof DBError) {
    switch (err.code) {
      case errorCode.CONNECTION: {
        c.status(502);
        break;
      }
      case errorCode.INTERNAL_SERVER_ERROR: {
        c.status(500);
        break;
      }
      case errorCode.NOT_FOUND: {
        c.status(404);
        break;
      }
    }
  } else if (err) {
    formatZodError(err, c);
  }

  return c.json(err.message);
}

export function ValidationErrorHandler(err: Error, c: Context) {
  if (err instanceof ValidationError) {
    switch (err.code) {
      case errorCode.INVALID: {
        c.status(400);
        break;
      }
    }
  }
}
