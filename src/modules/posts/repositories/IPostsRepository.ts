import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post.entity';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  findById(id: string): Promise<Post | undefined>;
  delete(post: Post): Promise<void>;
  getPaged(
    user_id: string,
    page: number,
    take?: number,
  ): Promise<Post[] | undefined>;
}
