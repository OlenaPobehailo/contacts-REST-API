import ICustomMongoError from "../interfaces/ICustomMongoError";
import ErrorMessageList from "../interfaces/IErrorMessageList";

const errorMessageList: ErrorMessageList = {
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const HttpError = (
  status: number,
  message: string = errorMessageList[status]
): ICustomMongoError => {
  const error = new Error(message) as ICustomMongoError;
  (error as any).status = status;
  return error;
};
