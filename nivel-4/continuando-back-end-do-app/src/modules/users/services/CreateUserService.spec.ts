import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from another", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

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
