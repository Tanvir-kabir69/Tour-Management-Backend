import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./userServices";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../utils/appError";

const createAUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createAUserIntoDB(req.body);

    if (!result) {
      throw new AppError(500, "Internal Server Error. Failed to create user.");
    }

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created Successfully",
      data: result,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsersFromDB();

    if (!result) {
      throw new AppError(500, "Internal Server Error. Failed to create user.");
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users are retrived successfully",
      data: result,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user;

    const payload = req.body;
    const result = await userServices.updateUserintoDB(
      userId,
      payload,
      verifiedToken
    );

    if (!result) {
      throw new AppError(500, "Internal Server Error. Failed to update user.");
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated Successfully",
      data: result,
    });
  }
);

export const userController = {
  createAUser,
  getAllUsers,
  updateUser,
};
