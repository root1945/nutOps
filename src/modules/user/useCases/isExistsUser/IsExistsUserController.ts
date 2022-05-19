import { Request, Response } from "express";
import { container } from "tsyringe";

import { validator } from "@utils/validator";

import { IsExistsUserUseCase } from "./IsExistsUserUseCase";

class IsExistsUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    validator(request.query, ["email", "phone"]);
    const { email, phone } = request.query;

    const isExistsUserUseCase = container.resolve(IsExistsUserUseCase);

    const user = await isExistsUserUseCase.execute({
      email: email.toString(),
      phone: phone.toString(),
    });

    return response.status(200).json({
      user,
      status: "success",
    });
  }
}

export { IsExistsUserController };
