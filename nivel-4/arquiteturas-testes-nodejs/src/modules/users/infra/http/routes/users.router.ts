import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";
import upladConfig from "../../../../../config/upload";

import CreateUserService from "../../../services/CreateUserService";
import UpdatedUserAvatarService from "../../../services/UpdatedUserAvatarService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(upladConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  const userWithOutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json(userWithOutPassword);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updatedUserAvatar = container.resolve(UpdatedUserAvatarService);

    const user = await updatedUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithOutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithOutPassword);
  }
);

export default usersRouter;
