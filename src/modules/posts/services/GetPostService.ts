import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post.entity';
import IPostsRepository from '../repositories/IPostsRepository';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class GetPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CheckIfUserOwnsPostService')
    private checkIfUserOwnsPostService: CheckIfUserOwnsPostService,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Post | undefined> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new AppError('Post not found.');
    }

    await this.checkIfUserOwnsPostService.execute({
      post_user_id: post.user_id,
      user_id: user_id,
    });

    return post;
  }
}

export default GetPostService;
