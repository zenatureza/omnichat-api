import AppError from '@shared/errors/AppError';
import HashProviderMock from '@shared/infra/providers/HashProvider/mocks/HashProviderMock';
import UsersRepositoryMock from '../repositories/mocks/UsersRepositoryMock';
import CreateUserService from './CreateUserService';

let usersRepositoryMock: UsersRepositoryMock;
let hashProviderMock: HashProviderMock;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    hashProviderMock = new HashProviderMock();

    createUserService = new CreateUserService(
      usersRepositoryMock,
      hashProviderMock,
    );
  });

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Árthur',
      email: 'testing.email.3@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a new user with existing email', async () => {
    await createUserService.execute({
      name: 'Árthur',
      email: 'testing.email.3@gmail.com',
      password: '123123',
    });

    await expect(
      createUserService.execute({
        name: 'Árthur',
        email: 'testing.email.3@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
