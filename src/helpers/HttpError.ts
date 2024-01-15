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
) => {
  const error = new Error(message);
  (error as any).status = status;
  return error;
};
