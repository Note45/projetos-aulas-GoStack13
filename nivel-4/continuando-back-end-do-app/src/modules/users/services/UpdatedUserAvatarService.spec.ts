import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import UpdateUserAvatarService from "./UpdatedUserAvatarService";

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let UpdateUserAvatar: UpdateUserAvatarService;

describe("UpdateUserAvatar", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    UpdateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );
  });

  it("should be able to update user avatar", async () => {
    const user = await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "teste.jpg",
    });

    expect(user.avatar).toEqual("teste.jpg");
  });

  it("should not be able to update avatar when user do not exist", async () => {
    await expect(
      UpdateUserAvatar.execute({
        user_id: "not-existing-user",
        avatarFilename: "teste.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when update new one", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const user = await fakeUserRepository.create({
      name: "teste aa",
      email: "teste@teste.com",
      password: "1231",
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "teste.jpg",
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "teste2.jpg",
    });

    expect(deleteFile).toHaveBeenCalledWith("teste.jpg");
    expect(user.avatar).toEqual("teste2.jpg");
  });
});
