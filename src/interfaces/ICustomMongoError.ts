import { MongoError } from "mongodb";

export default interface ICustomMongoError extends MongoError {
  status?: number;
}
