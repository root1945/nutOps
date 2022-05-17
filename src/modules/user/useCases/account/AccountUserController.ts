import { Request, Response } from "express";
import { container } from "tsyringe";

import { validator } from "@utils/validator";

import { AccountUserUseCase } from "./AccountUserUseCase";

class AccountUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    validator(request.headers, ["authorization"]);

    const authHeader = request.headers.authorization;

    const [, token] = authHeader.split(" ");

    const accountUserUseCase = container.resolve(AccountUserUseCase);

    const result = await accountUserUseCase.execute(token);

    return response.json(result);
  }
}

export { AccountUserController };
