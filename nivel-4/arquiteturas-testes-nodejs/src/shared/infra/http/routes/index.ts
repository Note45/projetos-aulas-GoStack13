import { Router } from "express";
import appointmentsRouter from "./appointments.router";
import userRouter from "./users.router";
import sessionsRouter from "./sessions.router";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
