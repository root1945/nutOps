import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/user/model/IUser";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class IsExistsUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    phone,
    email,
  }: IsExistsUserUseCase.Params): Promise<IsExistsUserUseCase.Response> {
    let user: IUser;

    user = await this.usersRepository.findByEmail(email);

    if (user?.id) {
      return true;
    }

    user = await this.usersRepository.findByPhone(phone);

    if (user?.id) {
      return true;
    }

    return false;
  }
}

namespace IsExistsUserUseCase {
  export type Params = {
    email: string;
    phone: string;
  };
  export type Response = boolean;
}

export { IsExistsUserUseCase };
