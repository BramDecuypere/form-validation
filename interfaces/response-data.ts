import { CustomError } from "./error";

export type ResponseData<TData> = {
  data?: TData;
  errors?: CustomError[];
};
