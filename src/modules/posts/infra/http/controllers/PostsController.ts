import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '@modules/posts/services/CreatePostService';

export default class PostsController {
  // TODO: [GET]
  public async index(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      title,
      description,
    });

    return response.json({ post });
  }

  // TODO: [GET/:id]
  public async get(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      title,
      description,
    });

    return response.json({ post });
  }

  // TODO: deve salvar o id do usuario
  // TODO: [POST]
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      title,
      description,
    });

    return response.json({ post });
  }

  // TODO: [PUT/:id]
  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      title,
      description,
    });

    return response.json({ post });
  }

  // TODO: [DELETE/:id]
  public async delete(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      title,
      description,
    });

    return response.json({ post });
  }
}
