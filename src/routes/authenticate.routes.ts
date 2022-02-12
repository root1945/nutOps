import { Router } from "express";

import { AuthenticateUserController } from "@modules/user/useCases/authenticate/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/", authenticateUserController.handle);

export { authenticateRoutes };
