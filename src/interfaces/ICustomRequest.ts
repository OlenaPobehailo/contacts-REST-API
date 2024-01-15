import { ICustomFile } from "./ICustomFile";
import { Request } from "express";

export interface ICustomRequest extends Request {
  user?: {
    _id: string;
    email: string;
    subscription: string;
    file?: ICustomFile;
  };
}
