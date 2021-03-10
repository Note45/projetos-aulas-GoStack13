import { Request, Response } from "express";
import { container } from "tsyringe";

import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "../../../services/UpdateProfileService";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userFormated } = user;

    return response.json(userFormated);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updatedProfile = container.resolve(UpdateProfileService);

    const user = await updatedProfile.execute({
      user_id,
      name,
      email,
      old_password,
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
  }
}
