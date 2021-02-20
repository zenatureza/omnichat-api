import { DeleteResult, getRepository, Not, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Post from '../entities/Post.entity';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
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

  public async delete(post: Post): Promise<DeleteResult> {
    return this.ormRepository.delete(post);
  }
}

export default PostsRepository;
