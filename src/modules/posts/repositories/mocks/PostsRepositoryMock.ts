import { uuid } from 'uuidv4';

import Post from '@modules/posts/infra/typeorm/entities/Post.entity';
import IPostsRepository from '../IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

class PostsRepositoryMock implements IPostsRepository {
  private posts: Post[] = [];
  private take = 2;

  public getDefaultTake() {
    return this.take;
  }

  public async findById(id: string): Promise<Post | undefined> {
    const findUser = this.posts.find(post => post.id === id);

    return findUser;
  }

  public async getPaged(
    user_id: string,
    page: number,
    pageSize?: number,
  ): Promise<Post[] | undefined> {
    const take = pageSize ?? this.take;
    const skip = (page - 1) * take;

    if (this.posts.length < skip) return;

    const lastIndex =
      skip + take > this.posts.length - 1 ? this.posts.length - 1 : skip + take;

    if (skip === lastIndex)
      return this.posts.slice(skip).filter(post => post.user_id === user_id);

    return this.posts
      .slice(skip, lastIndex)
      .filter(post => post.user_id === user_id);
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(
      post,
      {
        id: uuid(),
        title: postData.title,
        description: postData.description,
        user_id: postData.user_id,
        created_at: Date.now,
        updated_at: Date.now,
      },
      postData,
    );

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    const findIndex = this.posts.findIndex(findPost => findPost.id === post.id);

    this.posts[findIndex] = post;

    return post;
  }

  public async delete(post: Post): Promise<void> {
    const findIndex = this.posts.findIndex(findPost => findPost.id === post.id);

    this.posts = this.posts.splice(findIndex, 1);

    return;
  }
}

export default PostsRepositoryMock;
