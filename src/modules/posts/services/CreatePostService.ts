import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post.entity';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  title: string;
  description: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ title, description }: IRequest): Promise<Post> {}
}

export default CreatePostService;
