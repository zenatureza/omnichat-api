import UsersRepositoryMock from '@modules/users/repositories/mocks/UsersRepositoryMock';
import AppError from '@shared/errors/AppError';
import PostsRepositoryMock from '../repositories/mocks/PostsRepositoryMock';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';
import DeletePostService from './DeletePostService';

let postRepositoryMock: PostsRepositoryMock;
let usersRepositoryMock: UsersRepositoryMock;
let checkIfUserOwnsPostService: CheckIfUserOwnsPostService;

let deletePostService: DeletePostService;

describe('GetPost', () => {
  beforeEach(() => {
    postRepositoryMock = new PostsRepositoryMock();
    usersRepositoryMock = new UsersRepositoryMock();

    checkIfUserOwnsPostService = new CheckIfUserOwnsPostService(
      usersRepositoryMock,
    );
    deletePostService = new DeletePostService(
      postRepositoryMock,
      checkIfUserOwnsPostService,
    );
  });

  it('should throw an AppError if post not found', async () => {
    // Act
    // Assert
    await expect(
      deletePostService.execute({ id: 'nonexistingid', user_id: '' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete post', async () => {
    // Arrange
    const post = await postRepositoryMock.create({
      description: 's',
      title: 'assa',
      user_id: 'ass',
    });

    // Act
    const deleted = await deletePostService.execute({
      id: post.id,
      user_id: '',
    });

    // Assert
    expect(deleted).toBe(true);
  });
});
