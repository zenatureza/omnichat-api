import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/posts/services/CreatePostService';
import GetPostService from '@modules/posts/services/GetPostService';
import GetPagedPostsService from '@modules/posts/services/GetPagedPostsService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';

export default class PostsController {
  // [GET] /posts?page=${page}&take=${take}
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1 }: any = request.query;
    const { take } = request.query;
    const user_id = request.user.id;

    const params: any = { page, user_id };
    if (take) {
      params['take'] = parseInt(take as any);
    }

    const getPagedPostsService = container.resolve(GetPagedPostsService);
    const posts = await getPagedPostsService.execute(params);

    return response.json({ posts });
  }

  // [GET] /posts/:id
  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const getPostService = container.resolve(GetPostService);

    const post = await getPostService.execute({ id, user_id });

    return response.json({ post });
  }

  // [POST] /posts
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, description } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      title,
      description,
      user_id,
    });

    return response.json({ post });
  }

  // [PUT] /posts/:id
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description } = request.body;
    const user_id = request.user.id;

    const updatePostService = container.resolve(UpdatePostService);

    const post = await updatePostService.execute({
      title,
      description,
      id,
      user_id,
    });

    return response.json({ post });
  }

  // [DELETE] /posts/:id
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const deletePostService = container.resolve(DeletePostService);

    await deletePostService.execute({ id, user_id });

    return response.json({});
  }
}
