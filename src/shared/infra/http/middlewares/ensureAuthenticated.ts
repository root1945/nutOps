import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/user/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Token Missing!", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      process.env.SECRET_TOKEN || ":;c7T<(P-)T5Xq=T"
    );

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId.toString());

    if (!user) throw new AppError("User does not exists!", 401);

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
