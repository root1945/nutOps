import { ICreateCompaniesDTO } from "@modules/companies/dtos/ICreateCompaniesDTO";
import { ICompanies } from "@modules/companies/model/ICompanies";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { Prisma } from "@prisma/client";
import { prisma } from "@shared/infra/prisma/index";

class CompaniesRepository implements ICompaniesRepository {
  private repository: Prisma.CompaniesDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor() {
    this.repository = prisma.companies;
  }

  async create({ name, createBy }: ICreateCompaniesDTO): Promise<ICompanies> {
    const companies = await this.repository.create({
      data: {
        name,
        createBy,
      },
    });

    return companies;
  }
}

export { CompaniesRepository };
