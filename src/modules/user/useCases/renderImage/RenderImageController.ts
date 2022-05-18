import { Request, Response } from "express";

import { validator } from "@utils/validator";

class RenderImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    validator(request.query, ["path"]);

    const { path } = request.query;

    return response.sendFile(path);
  }
}

export { RenderImageController };
