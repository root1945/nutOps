import { hash } from "bcryptjs";
import { IUser } from "modules/user/model/IUser";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
  }: ICreateUserDTO): Promise<IUser> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const phoneAlreadyExists = await this.usersRepository.findByPhone(phone);

    if (phoneAlreadyExists) {
      throw new AppError("Phone already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
