import { container } from "tsyringe";

import { CompaniesRepository } from "@modules/companies/infra/prisma/repositories/CompaniesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { UsersRepository } from "@modules/user/infra/prisma/repositories/UsersRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICompaniesRepository>(
  "CompaniesRepository",
  CompaniesRepository
);
