import { Response, NextFunction } from "express";
import { CustomRequest } from "../common/CustomRequest";

export const ctrlWrapper = (
  controller: (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  const func = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return func;
};
