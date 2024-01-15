import { NextFunction } from "express";
import ICustomMongoError from "../interfaces/ICustomMongoError";

export const handleMongooseError = (
  error: ICustomMongoError,
  data: any,
  next: NextFunction
): void => {
  const { name, code } = error;

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;

  next();
};
