import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { companiesRouter } from "./companies.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/companies", companiesRouter);
router.use("/sessions", authenticateRoutes);

export { router };
