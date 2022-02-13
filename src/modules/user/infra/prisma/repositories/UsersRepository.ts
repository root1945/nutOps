import { prisma } from "@database/index";
import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { IUser } from "@modules/user/model/IUser";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { Prisma } from "@prisma/client";

class UsersRepository implements IUsersRepository {
  private repository: Prisma.UsersDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor() {
    this.repository = prisma.users;
  }

  async create({
    name,
    email,
    password,
    phone,
  }: ICreateUserDTO): Promise<IUser> {
    const user = await this.repository.create({
      data: {
        email,
        name,
        phone,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.repository.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(userId: string): Promise<IUser> {
    const user = await this.repository.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async findByPhone(phone: string): Promise<IUser> {
    const user = await this.repository.findUnique({
      where: {
        phone,
      },
    });
    return user;
  }
}

export { UsersRepository };
