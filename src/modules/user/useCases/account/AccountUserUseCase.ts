import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/user/model/IUser";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class AccountUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    params: AccountUserUseCase.Params
  ): Promise<AccountUserUseCase.Response> {
    try {
      const { sub: userId } = verify(params, process.env.SECRET_TOKEN);

      const user = await this.usersRepository.findById(userId.toString());

      return user;
    } catch (err) {
      throw new AppError(
        "Usuário não encontrado ou Token ínvalido. ",
        401,
        "warn"
      );
    }
  }
}

namespace AccountUserUseCase {
  export type Params = string;
  export type Response = IUser;
}

export { AccountUserUseCase };
