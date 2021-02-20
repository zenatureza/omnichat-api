import { inject, injectable } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post.entity';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  user_id: string;
  page: number;
  take?: number;
}

@injectable()
class GetPagedPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    page,
    take,
    user_id,
  }: IRequest): Promise<Post[] | undefined> {
    if (!take) return await this.postsRepository.getPaged(user_id, page);

    return await this.postsRepository.getPaged(user_id, page, take);
  }
}

export default GetPagedPostsService;
