import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";

import "reflect-metadata";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepository: UsersRepository;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "Vitoria",
      email: "vitoria@gmail.com",
      phone: "11956585586",
      password: "valeria54",
    };

    const userCreated = await createUserUseCase.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create an already existing user", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Vitoria",
        email: "vitoria@gmail.com",
        phone: "11956585586",
        password: "valeria54",
      };

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
