import { ICreateCompaniesDTO } from "../dtos/ICreateCompaniesDTO";
import { ICompanies } from "../model/ICompanies";

interface ICompaniesRepository {
  create(data: ICreateCompaniesDTO): Promise<ICompanies>;
  findByNameCompanies(name: string): Promise<ICompanies>;
}

export { ICompaniesRepository };
