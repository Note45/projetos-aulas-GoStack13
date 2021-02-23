import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdatedUserAvatarService from "../../../services/UpdatedUserAvatarService";

export default class UserAvatarControler {
  public async update(request: Request, response: Response): Promise<Response> {
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
}
