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
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    Avatar?: any;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new AppError("E-mail/senha estão incorretos!", 401, "warn");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new AppError("E-mail/senha estão incorretos!", 401, "warn");

    const token = sign({}, process.env.SECRET_TOKEN || ":;c7T<(P-)T5Xq=T", {
      subject: user.id,
      expiresIn: "24h",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        Avatar: user.Avatar ?? [],
      },
    };
  }
}

export { AuthenticateUserUseCase };
