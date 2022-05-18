import { inject, injectable } from "tsyringe";

import { IAvatarRepository } from "../../repositories/IAvatarRepository";

@injectable()
class ChangeAvatarUseCase {
  constructor(
    @inject("AvatarRepository")
    private avatarRepository: IAvatarRepository
  ) {}

  async execute({
    file,
    userId,
  }: ChangeAvatarUseCase.Params): Promise<ChangeAvatarUseCase.Request> {
    await this.avatarRepository.changeAvatar({
      createBy: userId,
      name: `${file.filename}`,
      type: file.mimetype,
      data: `${__dirname}/tmp/${file.filename}`,
    });

    return `${__dirname}/tmp/${file.filename}`;
  }
}

namespace ChangeAvatarUseCase {
  export type Params = {
    file: {
      filename: string;
      mimetype: string;
    };
    userId: string;
  };

  export type Request = string;
}

export { ChangeAvatarUseCase };
