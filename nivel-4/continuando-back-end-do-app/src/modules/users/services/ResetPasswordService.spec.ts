import AppError from "@shared/errors/AppError";

import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokenRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswordService from "./ResetPasswordService";

let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({
      password: "456",
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("456");
    expect(updatedUser?.password).toBe("456");
  });

  it("should not be able to reset password with non-existing token", async () => {
    await expect(
      resetPassword.execute({
        token: "non-existen-token",
        password: "12312312",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate(
      "non-existing-user"
    );

    await expect(
      resetPassword.execute({
        token,
        password: "12312312",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password if passed more then 2 hours", async () => {
    const user = await fakeUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customData = new Date();

      return customData.setHours(customData.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: "456",
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
