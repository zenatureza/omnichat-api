import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post.entity';
import IPostsRepository from '../repositories/IPostsRepository';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';

interface IRequest {
  id: string;
  user_id: string;
  title: string;
  description: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CheckIfUserOwnsPostService')
    private checkIfUserOwnsPostService: CheckIfUserOwnsPostService,
  ) {}

  public async execute({
    id,
    title,
    description,
    user_id,
  }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new AppError('Post not found.');
    }

    this.checkIfUserOwnsPostService.execute({
      user_id,
      post_user_id: post.user_id,
    });

    post.description = description;
    post.title = title;

    return await this.postsRepository.save(post);
  }
}

export default UpdatePostService;
