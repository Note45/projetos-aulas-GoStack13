import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateProfileService from "../../../services/UpdateProfileService";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {}

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
