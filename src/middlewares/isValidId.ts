import { isValidObjectId } from "mongoose";
import { Response, NextFunction } from "express";

import { ICustomRequest } from "../interfaces/ICustomRequest";

import { HttpError } from "../helpers";

export const isValidId = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};
