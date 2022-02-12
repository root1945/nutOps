import { v4 as uuidv4 } from "uuid";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUser } from "../../model/IUser";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: IUser[] = [];

  async create({
    name,
    email,
    password,
    phone,
  }: ICreateUserDTO): Promise<IUser> {
    const user = {
      id: String(uuidv4()),
      created_at: Date.now(),
    };

    this.users.push(
      Object.assign(user, {
        name,
        email,
        phone,
        password,
      })
    );

    return Object.assign(user, {
      name,
      email,
      phone,
      password,
    });
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findById(userId: string): Promise<IUser> {
    const user = this.users.find((user) => user.id === userId);
    return user;
  }

  async findByPhone(phone: string): Promise<IUser> {
    const user = this.users.find((user) => user.phone === phone);
    return user;
  }
}

export { UsersRepositoryInMemory };
