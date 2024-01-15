import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { HttpError } from "../helpers";
import { User } from "../models/user";
import { ICustomRequest } from "../interfaces/ICustomRequest";

const { SECRET_KEY } = process.env;

export const authenticate = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }

  if (!SECRET_KEY) {
    return next(
      HttpError(500, "Server misconfiguration: No secret key found.")
    );
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401));
    }

    // req.user = user;
    req.user = {
      _id: user._id.toString(),
      email: user.email,
      subscription: user.subscription,
    };

    next();
  } catch (error) {
    next(HttpError(401));
  }
};
