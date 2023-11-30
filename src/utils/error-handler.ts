import { Context } from 'hono';
import { DBError, ValidationError } from './custom-error';
import { errorCode } from './utils';
import { formatZodError } from './error-formater';
import { HTTPException } from 'hono/http-exception';

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
      case errorCode.NOT_FOUND: {
        c.status(404);
        break;
      }
      case errorCode.UNAUTHORIZED: {
        c.status(401);
        break;
      }
    }
  } else if (err instanceof HTTPException) {
    if (!err.getResponse().statusText) {
      return c.json('Missing authorization... You need to sign in');
    }
    return c.json(err.getResponse().statusText);
  } else {
    formatZodError(err, c);
  }

  return c.json(err.message);
}
