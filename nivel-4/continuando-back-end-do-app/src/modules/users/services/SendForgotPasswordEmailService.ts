import { injectable, inject } from "tsyringe";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "../../../shared/errors/AppError";
// import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
// import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError("User does not exist!");
    }

    this.mailProvider.sendMail(
      email,
      "Pedido de recuperação de senha recebido"
    );
  }
}

export default SendForgotPasswordEmailService;
