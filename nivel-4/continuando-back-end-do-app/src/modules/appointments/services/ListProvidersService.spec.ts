import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it("should be able to list the providers", async () => {
    const user1 = await fakeUserRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "1231",
    });

    const user2 = await fakeUserRepository.create({
      name: "teste1",
      email: "teste1@teste.com",
      password: "1231",
    });

    const loggedUser = await fakeUserRepository.create({
      name: "teste2",
      email: "teste2@teste.com",
      password: "1231",
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
