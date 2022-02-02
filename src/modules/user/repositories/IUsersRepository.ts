import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUser } from "../model/IUser";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findById(userId: string): Promise<IUser>;
  findByPhone(phone: string): Promise<IUser>;
}

export { IUsersRepository };
