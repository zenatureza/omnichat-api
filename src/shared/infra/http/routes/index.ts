import { Router, Request, Response } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import postsRouter from '@modules/posts/infra/http/routes/posts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRouter);

routes.get(
  '/',
  async (_: Request, response: Response): Promise<Response> => {
    return response.json({
      error:
        'Access: https://github.com/zenatureza/omnichat-api to discover how to use the api.',
    });
  },
);
// routes.get();

export default routes;
