import { IErrorResponse } from "./errorResponse";

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = IErrorResponse & {
  statusCode?: number;
  errorSources?: TErrorSources;
  stack: string | "" | null;
};
