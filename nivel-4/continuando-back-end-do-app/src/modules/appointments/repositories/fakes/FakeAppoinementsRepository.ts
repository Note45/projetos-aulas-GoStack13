import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear, getDate } from "date-fns";

import ICreateAppointmentDTO from "@modules/appointments/dto/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dto/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointments/dto/IFindAllInDayFromProviderDTO";
import IAppointmentsRepository from "../IAppointmentsRepository";

import Appointment from "../../infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private appointment: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointment.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async findByAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointment.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async findByAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointment.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointment.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
