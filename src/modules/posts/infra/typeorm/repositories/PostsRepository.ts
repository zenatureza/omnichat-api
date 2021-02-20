import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Post from '../entities/Post.entity';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;
  private take = 10;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async getPaged(
    user_id: string,
    page: number,
    pageSize?: number,
  ): Promise<Post[] | undefined> {
    const take = pageSize ?? this.take;
    const posts: Post[] = await this.ormRepository.find({
      skip: (page - 1) * take,
      take,
      where: {
        user_id,
      },
    });

    return posts;
  }

  public async findById(id: string): Promise<Post | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    return findAppointment;
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(postData);

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }

  public async delete(post: Post): Promise<void> {
    await this.ormRepository.delete(post);
    return;
  }
}

export default PostsRepository;
