import { IRouter, Router } from "express";
import { userRouter } from "../modules/user/userRoutes";
import { authRoute } from "../modules/auth/authRoute";

const router: IRouter = Router();

const moduleRoutes: { path: string; route: IRouter }[] = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// router.use("/login", authRoute);
// router.use("/user", userRouter);

export default router;
