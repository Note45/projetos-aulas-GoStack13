import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../../typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "../../../services/CreateAppointmentService";

import ensureAuthenticated from "../../../../users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const CreateAppointment = new CreateAppointmentService(
    appointmentsRepository
  );

  const appointment = await CreateAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
