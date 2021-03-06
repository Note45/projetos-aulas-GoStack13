import AppError from "@shared/errors/AppError";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from another", async () => {
    await createUser.execute({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    await expect(
      createUser.execute({
        name: "teste aa",
        email: "teste@teste.com",
        password: "1231",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
