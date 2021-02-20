import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../repositories/IPostsRepository';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CheckIfUserOwnsPostService')
    private checkIfUserOwnsPostService: CheckIfUserOwnsPostService,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<boolean> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new AppError('Post not found.');
    }

    this.checkIfUserOwnsPostService.execute({
      user_id,
      post_user_id: post.user_id,
    });

    await this.postsRepository.delete(post);
    return true;
  }
}

export default DeletePostService;
