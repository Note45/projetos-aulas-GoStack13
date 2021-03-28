import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProvidersDayAvailabilityController from "../../../services/ListProviderDayAvailabilityService";

export default class ProvidersDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProvidersDayAvailability = container.resolve(
      ListProvidersDayAvailabilityController
    );

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
