import { prisma } from "@database/index";
import { Prisma } from "@prisma/client";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUser } from "../../model/IUser";
import { IUsersRepository } from "../IUsersRepository";

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
