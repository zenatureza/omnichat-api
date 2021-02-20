import PostsRepositoryMock from '../repositories/mocks/PostsRepositoryMock';
import GetPagedPostsService from './GetPagedPostsService';

let getPagedPostsService: GetPagedPostsService;
let postRepositoryMock: PostsRepositoryMock;

const createFakePosts = async () => {
  await postRepositoryMock.create({
    title: '1',
    description: 'some description',
    user_id: 'asvaw',
  });
  await postRepositoryMock.create({
    title: '2',
    description: 'some description',
    user_id: 'asvaw',
  });
  await postRepositoryMock.create({
    title: '3',
    description: 'some description',
    user_id: 'asvaw',
  });
};

describe('GetPagedPosts', () => {
  beforeEach(async () => {
    postRepositoryMock = new PostsRepositoryMock();
    await createFakePosts();

    getPagedPostsService = new GetPagedPostsService(postRepositoryMock);
  });

  it('should get posts at given page with given page size', async () => {
    // Arrange
    const take = 2;
    const page = 1;
    const user_id = 'asvaw';

    // Act
    const posts = await getPagedPostsService.execute({
      user_id,
      page,
      take,
    });

    // Assert
    expect(posts).not.toBeUndefined();
    expect(posts?.length).toBe(take);
  });

  it('should get posts with default page size', async () => {
    // Arrange
    const page = 2;
    const defaultTake = postRepositoryMock.getDefaultTake();
    const user_id = 'asvaw';

    // Act
    const posts = await getPagedPostsService.execute({
      user_id,
      page,
    });

    // Assert
    expect(posts).not.toBeUndefined();
    expect(posts?.length).toBeLessThanOrEqual(defaultTake);
    posts?.forEach(post => {
      expect(post.user_id).toBe(user_id);
    });
  });
});
