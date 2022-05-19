import { Request, Response } from "express";
import { container } from "tsyringe";

import { validator } from "@utils/validator";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    validator(request.body, [
      "name",
      "email",
      "phone",
      "password",
      "companyName",
      "companyPhone",
      "companySector",
    ]);
    const {
      name,
      email,
      phone,
      password,
      companyName,
      companyPhone,
      companySector,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      phone: phone.toString(),
      password,
      companyName,
      companyPhone: companyPhone.toString(),
      companySector,
    });

    return response.status(201).json({
      user,
      message: "Usuário cadastrado com sucesso!",
      status: "success",
    });
  }
}

export { CreateUserController };
