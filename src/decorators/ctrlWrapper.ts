import { Response, NextFunction } from "express";
import { ICustomRequest } from "../interfaces/ICustomRequest";

export const ctrlWrapper = (
  controller: (
    req: ICustomRequest,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  const func = async (
    req: ICustomRequest,
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
