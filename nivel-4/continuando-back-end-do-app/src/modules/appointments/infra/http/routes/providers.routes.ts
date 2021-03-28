import { Router } from "express";

import ensureAuthenticated from "../../../../users/infra/http/middlewares/ensureAuthenticated";
import ProvidersController from "../controllers/ProvidersControlller";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get("/", providersController.index);
providersRouter.get(
  "/:provider_id/month-availability",
  providerMonthAvailabilityController.index
);
providersRouter.get(
  "/:provider_id/day-availability",
  providerDayAvailabilityController.index
);

export default providersRouter;
