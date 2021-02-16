import { uuid } from "uuidv4";

import ICreateAppointmentDTO from "@modules/appointments/dto/ICreateAppointmentDTO";
import IAppointmentsRepository from "../IAppointmentsRepository";

import Appointment from "../../infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private appointment: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointment.find(
      (appointment) => appointment.date === date
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointment.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
