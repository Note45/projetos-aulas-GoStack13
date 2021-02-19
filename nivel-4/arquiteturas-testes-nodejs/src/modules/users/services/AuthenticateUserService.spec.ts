import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
  it("should be able to authenticate", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const authenticateUser = new AuthenticateUserService(fakeUserRepository);
    const createUser = new CreateUserService(fakeUserRepository);

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
});
