import { MongoError } from 'mongodb';
import { NextFunction } from "express";

interface CustomMongoError extends MongoError {
  status?: number;
}

export const handleMongooseError = (
  error: CustomMongoError,
  data: any,
  next: NextFunction
) => {
  const { name, code } = error;

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;

  next();
};
