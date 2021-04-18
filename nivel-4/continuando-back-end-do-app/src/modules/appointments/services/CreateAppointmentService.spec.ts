import AppError from "@shared/errors/AppError";

import FakenNotificationsRepository from "@modules/notifications/repositories/fake/FakeNotificationsRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppoinementsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

let fakeAppoinementsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakenNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppoinementsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakenNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppoinementsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: "123131",
      provider_id: "123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123");
  });

  it("should not be able to create two appointment on the same time", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 14);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: "123131",
      provider_id: "123",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: "123131",
        provider_id: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: "123131",
        provider_id: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: "123131",
        provider_id: "123131",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment outside the available hours", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: "123131",
        provider_id: "2213132",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: "123131",
        provider_id: "54545",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
