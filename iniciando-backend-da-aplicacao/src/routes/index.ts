import { Router } from "express";
import appointmentsRouter from "./appointments.router";
import userRouter from "./users.router";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", userRouter);

export default routes;
