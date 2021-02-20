import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post.entity';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  title: string;
  description: string;
  user_id: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    title,
    description,
    user_id,
  }: IRequest): Promise<Post> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    return await this.postsRepository.create({
      description,
      title,
      user_id,
    });
  }
}

export default CreatePostService;
