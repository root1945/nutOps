import { Router } from "express";
import multer from "multer";

import { AccountUserController } from "@modules/user/useCases/account/AccountUserController";
import { ChangeAvatarController } from "@modules/user/useCases/changeAvatar/ChangeAvatarController";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { RenderImageController } from "@modules/user/useCases/renderImage/RenderImageController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/modules/user/useCases/changeAvatar/tmp/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now() + file.originalname}}`);
  },
});

const upload = multer({ storage });

const createUserController = new CreateUserController();
const accountUserController = new AccountUserController();
const changeAvatarController = new ChangeAvatarController();
const renderAvatarController = new RenderImageController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", ensureAuthenticated, accountUserController.handle);
userRoutes.put(
  "/changeAvatar",
  ensureAuthenticated,
  upload.single("avatar"),
  changeAvatarController.handle
);

userRoutes.get("/renderAvatar", renderAvatarController.handle);

export { userRoutes };
