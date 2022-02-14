import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Email/Password incorrect!");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email/Password incorrect!");

    const token = sign({}, process.env.SECRET_TOKEN || ":;c7T<(P-)T5Xq=T", {
      subject: user.id,
      expiresIn: "15m",
    });

    return { token };
  }
}

export { AuthenticateUserUseCase };
