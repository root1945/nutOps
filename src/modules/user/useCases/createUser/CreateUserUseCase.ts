import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

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
    companyName,
    companyPhone,
    companySector,
  }: CreateUserUseCase.Params): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Usuário já foi cadastrado!", 401, "warn");
    }

    const phoneAlreadyExists = await this.usersRepository.findByPhone(phone);

    if (phoneAlreadyExists) {
      throw new AppError("Celular já foi cadastrado!", 401, "warn");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      phone,
      password: passwordHash,
      companyName,
      companyPhone,
      companySector,
    });
  }
}

namespace CreateUserUseCase {
  export type Params = {
    name: string;
    phone: string;
    email: string;
    password: string;
    companyName: string;
    companyPhone: string;
    companySector: string;
  };
}

export { CreateUserUseCase };
