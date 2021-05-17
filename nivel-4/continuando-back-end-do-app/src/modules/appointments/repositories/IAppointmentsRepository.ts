import Appointment from "../infra/typeorm/entities/Appointment";
import IcreateAppointmentDTO from "../dto/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "../dto/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "../dto/IFindAllInDayFromProviderDTO";

export default interface AppointmentsRepository {
  create(data: IcreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findByAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>;
  findByAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>;
}
