import Appointment from "../infra/typeorm/entities/Appointment";
import IcreateAppointmentDTO from "../dto/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "../dto/IFindAllInMonthFromProviderDTO";

export default interface AppointmentsRepository {
  create(data: IcreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>;
}
