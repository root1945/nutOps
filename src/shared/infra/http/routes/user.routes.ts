import { Router } from "express";
import multer from "multer";

import { AccountUserController } from "@modules/user/useCases/account/AccountUserController";
import { ChangeAvatarController } from "@modules/user/useCases/changeAvatar/ChangeAvatarController";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { IsExistsUserController } from "@modules/user/useCases/isExistsUser/IsExistsUserController";
import { RenderImageController } from "@modules/user/useCases/renderImage/RenderImageController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "tmp");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now() + file.originalname}`);
  },
});

const upload = multer({ storage });

const createUserController = new CreateUserController();
const accountUserController = new AccountUserController();
const changeAvatarController = new ChangeAvatarController();
const renderAvatarController = new RenderImageController();
const isExistsUserController = new IsExistsUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", ensureAuthenticated, accountUserController.handle);
userRoutes.put(
  "/changeAvatar",
  ensureAuthenticated,
  upload.single("avatar"),
  changeAvatarController.handle
);

userRoutes.get("/renderAvatar", renderAvatarController.handle);
userRoutes.get("/isExists", isExistsUserController.handle);

export { userRoutes };
