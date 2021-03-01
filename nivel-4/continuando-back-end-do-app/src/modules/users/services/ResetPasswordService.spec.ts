import AppError from "@shared/errors/AppError";

import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokenRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ResetPasswordService from "./ResetPasswordService";

let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
    );
  });

  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: "456",
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe("456");
  });
});
