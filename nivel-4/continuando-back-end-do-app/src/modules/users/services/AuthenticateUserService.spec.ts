import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
  it("should be able to authenticate", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "teste do testa",
      email: "teste@teste.com",
      password: "1231",
    });

    const response = await authenticateUser.execute({
      email: "teste@teste.com",
      password: "1231",
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate with no exist user", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "teste@teste.com",
        password: "1231",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "teste do testa",
      email: "teste@teste.com",
      password: "1231",
    });

    expect(
      authenticateUser.execute({
        email: "teste@teste.com",
        password: "34234",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
