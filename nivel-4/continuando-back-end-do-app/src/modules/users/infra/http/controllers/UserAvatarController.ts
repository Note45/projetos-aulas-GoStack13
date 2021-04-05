import { classToClass } from "class-transformer";
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

    return response.json(classToClass(user));
  }
}
