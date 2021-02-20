import AppError from '@shared/errors/AppError';
import HashProviderMock from '@shared/infra/providers/HashProvider/mocks/HashProviderMock';
import UsersRepositoryMock from '../repositories/mocks/UsersRepositoryMock';
import AuthenticateUserService from './AuthenticateUserService';

let usersRepositoryMock: UsersRepositoryMock;
let hashProviderMock: HashProviderMock;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    hashProviderMock = new HashProviderMock();

    authenticateUserService = new AuthenticateUserService(
      usersRepositoryMock,
      hashProviderMock,
    );
  });

  it('should authenticate user', async () => {
    // Arrange
    const email = 'testing.email.3@gmail.com';
    const password = 'test';
    const name = 'Árthur';

    const user = await usersRepositoryMock.create({
      email,
      password,
      name,
    });

    // Act
    const response = await authenticateUserService.execute({ email, password });

    // Assert
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should throw AppError with non existing user', async () => {
    // Arrange
    const email = 'testing.email.3@gmail.com';
    const password = 'password';

    // Act
    // Assert
    await expect(
      authenticateUserService.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw AppError with incorrect password', async () => {
    // Arrange
    const email = 'testing.email.3@gmail.com';
    const password = 'wrong-password';
    const name = 'Árthur';

    await usersRepositoryMock.create({
      email,
      password: 'password',
      name,
    });

    // Act
    // Assert
    await expect(
      authenticateUserService.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
