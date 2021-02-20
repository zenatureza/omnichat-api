import UsersRepositoryMock from '@modules/users/repositories/mocks/UsersRepositoryMock';
import AppError from '@shared/errors/AppError';
import PostsRepositoryMock from '../repositories/mocks/PostsRepositoryMock';
import CheckIfUserOwnsPostService from './CheckIfUserOwnsPostService';
import UpdatePostService from './UpdatePostService';

let postRepositoryMock: PostsRepositoryMock;
let usersRepositoryMock: UsersRepositoryMock;
let checkIfUserOwnsPostService: CheckIfUserOwnsPostService;

let updatePostService: UpdatePostService;

describe('UpdatePost', () => {
  beforeEach(() => {
    postRepositoryMock = new PostsRepositoryMock();
    usersRepositoryMock = new UsersRepositoryMock();
    checkIfUserOwnsPostService = new CheckIfUserOwnsPostService(
      usersRepositoryMock,
    );

    updatePostService = new UpdatePostService(
      postRepositoryMock,
      checkIfUserOwnsPostService,
    );
  });

  it('should throw an AppError when post doesnt exist', async () => {
    // Arrange
    const title = 'New post';
    const description = 'This is a new post';
    const id = '11';
    const user_id = 'ax';

    // Act
    // Assert
    await expect(
      updatePostService.execute({
        description,
        title,
        user_id,
        id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update post data', async () => {
    // Arrange
    const title = 'New post';
    const description = 'This is a new post';
    // const user_id = 'ax';

    const user = await usersRepositoryMock.create({
      email: 'test@gmail.com',
      name: 'myname',
      password: 'ss',
    });

    // Act
    const post = await postRepositoryMock.create({
      description: 'blabla',
      title: 'haha',
      user_id: user.id,
    });

    const updatedPost = await updatePostService.execute({
      description,
      title,
      user_id: user.id,
      id: post.id,
    });

    // Assert
    expect(updatedPost.id).toBe(post.id);
    expect(updatedPost.title).toBe(title);
    expect(updatedPost.description).toBe(description);
  });
});
