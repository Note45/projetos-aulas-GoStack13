import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProvidersMonthAvailabilityController from "../../../services/ListProviderMonthAvailabilityService";

export default class ProvidersMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year } = request.body;

    const listProvidersMonthAvailability = container.resolve(
      ListProvidersMonthAvailabilityController
    );

    const appointment = await listProvidersMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(appointment);
  }
}
