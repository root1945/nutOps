import { IChangeAvatarDTO } from "@modules/user/dtos/IChangeAvatarDTO";
import { IAvatarRepository } from "@modules/user/repositories/IAvatarRepository";
import { Prisma } from "@prisma/client";
import { prisma } from "@shared/infra/prisma/index";

class AvatarRepository implements IAvatarRepository {
  private repository: Prisma.AvatarDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor() {
    this.repository = prisma.avatar;
  }

  async changeAvatar({
    createBy,
    name,
    type,
    data,
  }: IChangeAvatarDTO): Promise<void> {
    await this.repository.create({
      data: {
        createBy,
        name,
        type,
        data,
      },
    });
  }
}

export { AvatarRepository };
