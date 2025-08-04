import { IRouter, Router } from "express";
import { authController } from "./authController";
import { checkAuth } from "../../utils/middlewares/checkAuth";
import { Role } from "../user/userInterface";

const router: IRouter = Router();

router.post("/login", authController.credentialLogin);
router.post("/refresh-token", authController.newAccessToken);
router.post("/logout", authController.logout);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authController.resetPassword
);

export const authRoute = router;
