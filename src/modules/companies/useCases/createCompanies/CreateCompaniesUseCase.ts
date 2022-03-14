import { ICompanies } from "modules/companies/model/ICompanies";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICreateCompaniesDTO } from "../../dtos/ICreateCompaniesDTO";
import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

@injectable()
class CreateCompaniesUseCase {
  constructor(
    @inject("CompaniesRepository")
    private CompaniesRepository: ICompaniesRepository
  ) {}

  async execute({ name, createBy }: ICreateCompaniesDTO): Promise<ICompanies> {
    const companiesAlreadyExists =
      await this.CompaniesRepository.findByNameCompanies(name);

    if (companiesAlreadyExists) {
      throw new AppError("Essa empresa já foi cadastrada!", 401, "warn");
    }
    const companies = await this.CompaniesRepository.create({
      name,
      createBy,
    });

    return companies;
  }
}

export { CreateCompaniesUseCase };
