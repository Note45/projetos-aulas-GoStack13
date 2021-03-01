import { injectable, inject } from "tsyringe";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvide";

import AppError from "../../../shared/errors/AppError";

import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdatedUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdatedUserAvatarService;