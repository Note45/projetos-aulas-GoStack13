import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

// import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokensRepository from "../repositories/IUserTokenRepository";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exist!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exist!");
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;