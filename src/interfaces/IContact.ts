import { Types } from "mongoose";

export default interface IContact {
    name: string;
    email?: string;
    phone?: string;
    favorite: boolean;
    owner: Types.ObjectId;
  }
  