import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokenRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it("should be able to recovery the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUserRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "123",
    });

    await sendForgotPasswordEmail.execute({
      email: "teste@teste.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recovery password of a not-existing user", async () => {
    await await expect(
      sendForgotPasswordEmail.execute({
        email: "teste@teste.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

    const user = await fakeUserRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "123",
    });

    await sendForgotPasswordEmail.execute({
      email: "teste@teste.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
