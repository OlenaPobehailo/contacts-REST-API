import { isValidObjectId } from "mongoose";
import { Response, NextFunction } from "express";

import { CustomRequest } from "../common/CustomRequest";

import { HttpError } from "../helpers";

export const isValidId = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};
