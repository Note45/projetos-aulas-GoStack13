// import AppError from "@shared/errors/AppError";
import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import ShowProfileService from "./ShowProfileService";

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it("should be able to show the profile", async () => {
    const user = await fakeUserRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: "1231",
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("teste");
    expect(profile.email).toBe("teste@teste.com");
  });

  it("should not be able to show the profile from non-existing user", async () => {
    await expect(
      showProfile.execute({
        user_id: "non-existing-user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
