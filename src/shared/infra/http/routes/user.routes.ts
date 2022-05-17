import { Router } from "express";

import { AccountUserController } from "@modules/user/useCases/account/AccountUserController";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const accountUserController = new AccountUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", accountUserController.handle);

export { userRoutes };
