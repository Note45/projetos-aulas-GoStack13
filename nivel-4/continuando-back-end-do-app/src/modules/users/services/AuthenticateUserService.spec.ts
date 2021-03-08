import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to authenticate", async () => {
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
    await expect(
      authenticateUser.execute({
        email: "teste@teste.com",
        password: "1231",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await createUser.execute({
      name: "teste do testa",
      email: "teste@teste.com",
      password: "1231",
    });

    await expect(
      authenticateUser.execute({
        email: "teste@teste.com",
        password: "34234",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
