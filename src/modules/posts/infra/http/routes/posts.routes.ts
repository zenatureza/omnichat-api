import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PostsController from '../controllers/PostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.use(ensureAuthenticated);

postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  postsController.create,
);

postsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer(),
      // description: Joi.string().required(),
    },
  }),
  postsController.index,
);

postsRouter.get('/:id', postsController.get);

postsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  postsController.update,
);

postsRouter.delete('/:id', postsController.delete);

export default postsRouter;
