import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/user/model/IUser";

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
    const userId = params;

    const user = await this.usersRepository.findById(userId);

    return user;
  }
}

namespace AccountUserUseCase {
  export type Params = string;
  export type Response = IUser;
}

export { AccountUserUseCase };
