import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./userServices";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAUserIntoDB(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created Successfully",
    data: result,
  });
});

const getAllUsers = () => {};

export const userController = {
  createAUser,
  getAllUsers,
};
