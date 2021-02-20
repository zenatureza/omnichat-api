import { container } from 'tsyringe';

import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import CheckIfUserOwnsPostService from '@modules/posts/services/CheckIfUserOwnsPostService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import BCryptHashProvider from '@shared/infra/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@shared/infra/providers/HashProvider/interfaces/IHashProvider';
import WinstonLogProvider from '@shared/infra/providers/LogProvider/implementations/WinstonLogProvider';
import ILogProvider from '@shared/infra/providers/LogProvider/interfaces/ILogProvider';
import HttpLogger from '@shared/infra/http/middlewares/httpLogger';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ILogProvider>('LogProvider', WinstonLogProvider);

container.registerSingleton<HttpLogger>('HttpLogger', HttpLogger);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<CheckIfUserOwnsPostService>(
  'CheckIfUserOwnsPostService',
  CheckIfUserOwnsPostService,
);
