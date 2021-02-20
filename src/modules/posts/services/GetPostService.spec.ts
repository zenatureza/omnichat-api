import UsersRepositoryMock from '@modules/users/repositories/mocks/UsersRepositoryMock';
import AppError from '@shared/errors/AppError';
import PostsRepositoryMock from '../repositories/mocks/PostsRepositoryMock';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';
import GetPostService from './GetPostService';

let postRepositoryMock: PostsRepositoryMock;
let usersRepositoryMock: UsersRepositoryMock;

let getPostService: GetPostService;
let checkIfUserOwnsPostService: CheckIfUserOwnsPostService;

describe('GetPost', () => {
  beforeEach(() => {
    postRepositoryMock = new PostsRepositoryMock();
    usersRepositoryMock = new UsersRepositoryMock();
    checkIfUserOwnsPostService = new CheckIfUserOwnsPostService(
      usersRepositoryMock,
    );
    getPostService = new GetPostService(
      postRepositoryMock,
      checkIfUserOwnsPostService,
    );
  });

  it('should throw an AppError if post not found', async () => {
    // Arrange
    // Act
    // Assert
    await expect(
      getPostService.execute({
        id: 'someid',
        user_id: 'some-unexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should get post', async () => {
    // Arrange
    const user = await usersRepositoryMock.create({
      email: 'a@gmail.com',
      password: '123',
      name: 'assa',
    });

    const user_id = user.id;
    const existingPost = await postRepositoryMock.create({
      title: 'some title',
      description: 'some description',
      user_id,
    });

    // Act
    const post = await getPostService.execute({ id: existingPost.id, user_id });

    // Assert
    expect(post).toHaveProperty('id');
  });
});
