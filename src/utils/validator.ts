import { AppError } from "errors/AppError";

const validator = (body: any, fields: string[]) => {
  fields.forEach((field) => {
    if (!body[field]) throw new AppError(`Missig Param error: ${field}`);
  });
};

export { validator };
