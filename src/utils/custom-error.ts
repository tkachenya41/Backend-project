import { errorCode, formatZodError } from '@/utils/utils';
import { Context } from 'hono';

export class DBError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'DBError';
    this.code = code;
  }
}

export function errorHandler(err: Error, c: Context) {
  if (err instanceof DBError) {
    switch (err.code) {
      case errorCode.INVALID: {
        c.status(400);
        break;
      }
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
  } else if (err){
    formatZodError(err, c)
  }

  return c.json(err.message);
}
