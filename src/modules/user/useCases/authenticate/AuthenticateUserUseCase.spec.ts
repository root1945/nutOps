import { AppError } from "@errors/AppError";

import "reflect-metadata";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepository;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const user = {
      email: "munternl13@gmail.com",
      password: "victor54",
    };

    const result = await authenticateUserUseCase.execute(user);

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "password_false",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "munternl13@gmail.com",
        password: "password_false",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
