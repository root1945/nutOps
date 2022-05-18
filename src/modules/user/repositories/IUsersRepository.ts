import { IUser } from "../model/IUser";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";

interface IUsersRepository {
  create(data: CreateUserUseCase.Params): Promise<void>;
  findByEmail(email: string): Promise<IUser>;
  findById(userId: string): Promise<IUser>;
  findByPhone(phone: string): Promise<IUser>;
}

export { IUsersRepository };
