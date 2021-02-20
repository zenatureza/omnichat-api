import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  post_user_id: string;
}

@injectable()
class CheckIfUserOwnsPostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ post_user_id, user_id }: IRequest): Promise<boolean> {
    if (user_id !== post_user_id) {
      throw new AppError(
        `This user doesnt have permission to complete this action.`,
        403,
      );
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return true;
  }
}

export default CheckIfUserOwnsPostService;
