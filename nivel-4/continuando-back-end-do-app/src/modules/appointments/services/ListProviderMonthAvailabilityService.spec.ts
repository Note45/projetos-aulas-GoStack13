import FakeAppointmentsRepository from "../repositories/fakes/FakeAppoinementsRepository";
import ListProviderMonthAvailability from "./ListProviderMonthAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the month availability from provider", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 10, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 17, 0, 0),
    });

    const availability = listProviderMonthAvailability.execute({
      provider_id: "user",
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true },
        { day: 20, availability: false },
        { day: 21, availability: true },
        { day: 22, availability: true },
      ])
    );
  });
});
