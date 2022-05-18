import { IUser } from "@modules/user/model/IUser";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/user/useCases/createUser/CreateUserUseCase";
import { Prisma } from "@prisma/client";
import { prisma } from "@shared/infra/prisma/index";

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
    companyName,
    companyPhone,
    companySector,
  }: CreateUserUseCase.Params): Promise<void> {
    await this.repository.create({
      data: {
        email,
        name,
        phone,
        password,
        Companies: {
          create: {
            name: companyName,
            phone: companyPhone,
            sector: companySector,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.repository.findUnique({
      where: {
        email,
      },
      include: {
        Avatar: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
    return user;
  }

  async findById(userId: string): Promise<IUser> {
    const user = await this.repository.findUnique({
      where: {
        id: userId,
      },
      include: {
        Avatar: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
    return user;
  }

  async findByPhone(phone: string): Promise<IUser> {
    const user = await this.repository.findUnique({
      where: {
        phone,
      },
      include: {
        Avatar: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
    return user;
  }
}

export { UsersRepository };
