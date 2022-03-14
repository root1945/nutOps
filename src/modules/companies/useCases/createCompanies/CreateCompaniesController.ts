import { Request, Response } from "express";
import { container } from "tsyringe";

import { validator } from "@utils/validator";

import { CreateCompaniesUseCase } from "./CreateCompaniesUseCase";

class CreateCompaniesController {
  async handle(request: Request, response: Response): Promise<Response> {
    validator(request.body, ["name"]);
    const { name } = request.body;

    const createCompaniesUseCase = container.resolve(CreateCompaniesUseCase);

    const Companies = await createCompaniesUseCase.execute({
      name,
      createBy: request.user.id,
    });

    return response.status(201).json({
      Companies,
      message: "Empresa cadastrada com sucesso!",
      status: "success",
    });
  }
}

export { CreateCompaniesController };
