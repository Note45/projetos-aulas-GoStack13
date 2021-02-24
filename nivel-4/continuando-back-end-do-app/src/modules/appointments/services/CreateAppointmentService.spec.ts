import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppoinementsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe("CreateAppointment", () => {
  it("should be able to create a new appointment", async () => {
    const fakeAppoinementsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppoinementsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123");
  });

  it("should not be able to create two appointment on the same time", async () => {
    const fakeAppoinementsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppoinementsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
