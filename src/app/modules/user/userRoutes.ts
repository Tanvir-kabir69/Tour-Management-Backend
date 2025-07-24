import { IRouter, Router } from "express";
import { userController } from "./userController";
import { createUserZodSchema } from "./userValidation";
import validateRequest from "../../utils/middlewares/validateRequest";

const router: IRouter = Router();

router.post(
  "/",
  validateRequest(createUserZodSchema),
  userController.createAUser
);
router.get("/", userController.getAllUsers);

export const userRouter = router;
