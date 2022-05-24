import { container } from "tsyringe";

import { CompaniesRepository } from "@modules/companies/infra/prisma/repositories/CompaniesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AvatarRepository } from "@modules/user/infra/prisma/repositories/AvatarRepository";
import { UsersRepository } from "@modules/user/infra/prisma/repositories/UsersRepository";
import { IAvatarRepository } from "@modules/user/repositories/IAvatarRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/provider/IMailProvider/ImailProvider";
import { EmailProvider } from "@shared/container/provider/IMailProvider/implementations/IMailProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICompaniesRepository>(
  "CompaniesRepository",
  CompaniesRepository
);

container.registerSingleton<IAvatarRepository>(
  "AvatarRepository",
  AvatarRepository
);

container.registerSingleton<IMailProvider>("EmailProvider", EmailProvider);
