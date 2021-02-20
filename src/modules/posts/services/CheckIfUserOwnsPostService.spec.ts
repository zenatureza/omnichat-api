import UsersRepositoryMock from '@modules/users/repositories/mocks/UsersRepositoryMock';
import AppError from '@shared/errors/AppError';
import PostsRepositoryMock from '../repositories/mocks/PostsRepositoryMock';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';

let usersRepositoryMock: UsersRepositoryMock;
let postsRepositoryMock: PostsRepositoryMock;
let checkIfUserOwnsPostService: CheckIfUserOwnsPostService;

describe('CheckIfUserOwnsPostService', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    postsRepositoryMock = new PostsRepositoryMock();

    checkIfUserOwnsPostService = new CheckIfUserOwnsPostService(
      usersRepositoryMock,
    );
  });

  it('should throw an AppError when user_id !== post.user_id', async () => {
    // Arrange
    const post_user_id = '10';
    const user_id = '20';

    // Act
    // Assert
    await expect(
      checkIfUserOwnsPostService.execute({
        post_user_id,
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an AppError when user not found', async () => {
    // Arrange
    const post_user_id = '10';
    const user_id = '10';

    // Act
    // Assert
    await expect(
      checkIfUserOwnsPostService.execute({
        post_user_id,
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return true when user owns post', async () => {
    // Arrange
    const user = await usersRepositoryMock.create({
      email: 'email@email.com',
      name: 'myname',
      password: 'as',
    });

    const post = await postsRepositoryMock.create({
      title: 'bla',
      description: 'blabla',
      user_id: user.id,
    });

    // Act
    const userOwnsPost = await checkIfUserOwnsPostService.execute({
      post_user_id: post.user_id,
      user_id: user.id,
    });

    // Assert
    expect(userOwnsPost).toBe(true);
  });
});
