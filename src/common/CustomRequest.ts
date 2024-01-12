import { CustomFile } from "./CustomFile";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
    email: string;
    subscription: string;
    file?: CustomFile;
  };
}
