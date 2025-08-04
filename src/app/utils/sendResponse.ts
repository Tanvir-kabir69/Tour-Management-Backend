import { Response } from "express";
import { TResponse } from "../interfacesAndTpes/responseType";

const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  res.status(responseData.statusCode).json({
    success: responseData?.success,
    message: responseData?.message,
    data: responseData?.data,
  });
};

export default sendResponse;
