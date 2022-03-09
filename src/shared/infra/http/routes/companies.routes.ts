import { Router } from "express";

import { CreateCompaniesController } from "@modules/companies/useCases/createCompanies/CreateCompaniesController";

const companiesRouter = Router();

const createCompaniesController = new CreateCompaniesController();

companiesRouter.post("/create", createCompaniesController.handle);

export { companiesRouter };
