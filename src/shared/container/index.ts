import { UsersRepository } from "modules/user/repositories/implementations/UsersRepository";
import { IUsersRepository } from "modules/user/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
