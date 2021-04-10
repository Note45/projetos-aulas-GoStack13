import { injectable, inject } from "tsyringe";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    this.cacheProvider.save("asf", "asdf");

    return users;
  }
}

export default ListProvidersService;
