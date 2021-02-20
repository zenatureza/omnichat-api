import UsersRepositoryMock from '@modules/users/repositories/mocks/UsersRepositoryMock';
import AppError from '@shared/errors/AppError';
import PostsRepositoryMock from '../repositories/mocks/PostsRepositoryMock';
import CreatePostService from './CreatePostService';

let createPostService: CreatePostService;
let postRepositoryMock: PostsRepositoryMock;
let usersRepositoryMock: UsersRepositoryMock;

describe('CreatePost', () => {
  beforeEach(() => {
    postRepositoryMock = new PostsRepositoryMock();
    usersRepositoryMock = new UsersRepositoryMock();

    createPostService = new CreatePostService(
      postRepositoryMock,
      usersRepositoryMock,
    );
  });

  it('should create new post', async () => {
    // Arrange
    const title = 'New post';
    const description = 'This is a new post';
    // const user_id = 1

    const user = await usersRepositoryMock.create({
      email: 'test@gmail.com',
      name: 'User',
      password: 'somepassword',
    });

    // Act
    const post = await createPostService.execute({
      description,
      title,
      user_id: user.id,
    });

    // Assert
    expect(post).toHaveProperty('created_at');
    expect(post.id).not.toBeNull();
  });

  it('should throw an app error when user wasnt found', async () => {
    // Arrange
    const title = 'New post';
    const description = 'This is a new post';

    // Act
    // Assert
    await expect(
      createPostService.execute({
        title,
        description,
        user_id: 'some-unexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
