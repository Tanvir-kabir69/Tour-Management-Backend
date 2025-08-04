export type TResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
};