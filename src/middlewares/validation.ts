// import { errorCode } from '@/utils/utils';
// import { DBError } from '@/validation/custom-error';
// import { Hono } from 'hono';
// const app = new Hono();

// export const validateUserId = () => {
//   return app.use('/users/:id', async (c, next) => {
//     const id = Number(c.req.param);

//     if (isNaN(id)) {
//       throw new DBError('UserId should be a number.', errorCode.INVALID);
//     }

//     await next();
//   });
// };

import { z } from 'zod';

export const idSchema = z.object({
  id: z.number(),
});
