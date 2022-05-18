import { IChangeAvatarDTO } from "../dtos/IChangeAvatarDTO";

interface IAvatarRepository {
  changeAvatar({ createBy, name, type, data }: IChangeAvatarDTO): Promise<void>;
}

export { IAvatarRepository };
