import { Request, Response } from "express";
import { container } from "tsyringe";

import { validator } from "@utils/validator";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    validator(request.body, ["name", "email", "phone", "password"]);
    const { name, email, phone, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
