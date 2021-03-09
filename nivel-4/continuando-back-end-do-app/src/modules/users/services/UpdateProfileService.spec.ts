// import AppError from "@shared/errors/AppError";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import UpdateProfileService from "./UpdateProfileService";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it("should be able to update profile", async () => {
    const user = await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Antonio",
      email: "antonio@antonio.com",
    });

    expect(updatedUser.name).toBe("Antonio");
    expect(updatedUser.email).toBe("antonio@antonio.com");
  });

  it("should be able to change email to another user email", async () => {
    await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    const user = await fakeUserRepository.create({
      name: "teste1",
      email: "teste1@teste.com",
      password: "1231",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Antonio",
        email: "teste@teste.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Antonio",
      email: "antonio@antonio.com",
      old_password: "1231",
      password: "4567",
    });

    expect(updatedUser.password).toBe("4567");
  });

  it("should not be able to update the password whitout old password", async () => {
    const user = await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Antonio",
        email: "antonio@antonio.com",
        password: "4567",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the password whit wrong old password", async () => {
    const user = await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Antonio",
        email: "antonio@antonio.com",
        old_password: "wrong-old-password",
        password: "4567",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
