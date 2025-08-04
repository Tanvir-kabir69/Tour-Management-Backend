import { IRouter, NextFunction, Request, Response, Router } from "express";
import { userController } from "./userController";
import { createUserZodSchema, updateUserZodSchema } from "./userValidation";
import validateRequest from "../../utils/middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../utils/appError";
import { Role } from "./userInterface";
import { checkAuth } from "../../utils/middlewares/checkAuth";

const router: IRouter = Router();

router.post(
  "/",
  validateRequest(createUserZodSchema),
  userController.createAUser
);

router.get(
  "/",
  checkAuth(Role.USER, Role.SUPER_ADMIN),
  userController.getAllUsers
);

router.put(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userController.updateUser
);

export const userRouter = router;
