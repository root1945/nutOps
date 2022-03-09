import { ICompanies } from "modules/companies/model/ICompanies";
import { inject, injectable } from "tsyringe";

import { ICreateCompaniesDTO } from "../../dtos/ICreateCompaniesDTO";
import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

@injectable()
class CreateCompaniesUseCase {
  constructor(
    @inject("CompaniessRepository")
    private CompaniessRepository: ICompaniesRepository
  ) {}

  async execute({ name, createBy }: ICreateCompaniesDTO): Promise<ICompanies> {
    const companies = await this.CompaniessRepository.create({
      name,
      createBy,
    });

    return companies;
  }
}

export { CreateCompaniesUseCase };
