import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ChangeAvatarUseCase } from "./ChangeAvatarUseCase";

class ChangeAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.file)
      throw new AppError("Imagem não encontrada! ", 401, "warn");

    const changeAvatarUseCase = container.resolve(ChangeAvatarUseCase);

    const path = await changeAvatarUseCase.execute({
      file: {
        mimetype: request.file.mimetype,
        filename: request.file.filename,
      },
      userId: request.user.id,
    });

    return response.status(201).json({
      path,
      message: "Avatar alterado com sucesso.",
      status: "success",
    });
  }
}

export { ChangeAvatarController };
