/* eslint-disable no-use-before-define */
import { hash } from "bcryptjs";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IMailProvider } from "@shared/container/provider/IMailProvider/ImailProvider";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EmailProvider")
    private mailProvider: IMailProvider
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

    const token = uuidv4();

    const variables = {
      name,
      link: `https://api.nutops.com.br/verifyAccount/${token}`,
    };

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "createUserEmail.hbs"
    );

    await this.mailProvider.sendMail(
      email,
      "Ativação de Usuário",
      variables,
      templatePath
    );
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
