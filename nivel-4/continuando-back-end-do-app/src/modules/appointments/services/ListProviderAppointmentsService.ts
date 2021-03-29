import { injectable, inject } from "tsyringe";

import Appointments from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersAppointmentsService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointments[]> {
    const appointments = await this.appointmentsRepository.findByAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      }
    );

    return appointments;
  }
}

export default ListProvidersAppointmentsService;
