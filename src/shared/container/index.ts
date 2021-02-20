import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import BCryptHashProvider from '@shared/infra/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@shared/infra/providers/HashProvider/interfaces/IHashProvider';
import { container } from 'tsyringe';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
