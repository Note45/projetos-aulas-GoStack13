import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

describe("SendForgotPasswordEmail", () => {
  it("should be able to recovery the password using the email", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider
    );

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
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider
    );

    await await expect(
      sendForgotPasswordEmail.execute({
        email: "teste@teste.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
