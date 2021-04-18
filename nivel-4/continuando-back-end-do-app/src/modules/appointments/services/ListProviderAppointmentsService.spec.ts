import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppoinementsRepository";
import ListProvidersAppointmentsService from "./ListProviderAppointmentsService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersAppointmentsService: ListProvidersAppointmentsService;

describe("ListProviderAppointmentService", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersAppointmentsService = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list the appointments on a specific day", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: "provider",
      user_id: "user",
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: "provider",
      user_id: "user",
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProvidersAppointmentsService.execute({
      provider_id: "provider",
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
