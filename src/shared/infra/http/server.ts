import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { AppError } from "../../errors/AppError";
import { router } from "./routes";

import "../../container";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
        status: err.status,
      });
    }

    console.log(err.message);

    return response.status(500).json({
      status: "error",
      message: `Internal server error`,
    });
  }
);

app.listen(3030, () => {
  console.log("Server is running!");
});
