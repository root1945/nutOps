import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";

import "reflect-metadata";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "Vitoria",
      email: "vitoria@gmail.com",
      phone: "11956585586",
      password: "vitoria54",
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
        password: "vitoria54",
      };

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("must not be able to create a user with already existing phone", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Leandro",
        email: "leandro@gmail.com",
        phone: "11956585586",
        password: "leandro54",
      };

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
