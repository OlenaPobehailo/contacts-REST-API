import { Response, NextFunction } from "express";
import { Schema } from "joi";
import { CustomRequest } from "../common/CustomRequest";
import { HttpError } from "../helpers";

export const validateBody = (schema: Schema) => {
  const func = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
  return func;
};
