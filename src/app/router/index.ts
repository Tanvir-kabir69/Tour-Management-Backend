import { IRouter, Router } from "express";
import { userRouter } from "../modules/user/userRoutes";

const router: IRouter = Router();

// const moduleRoutes = [
//   {
//     path: "/user",
//     route: userRouter,
//   },
// ];

// moduleRoutes.forEach((route) => {
//   router.use(route.path, route.route);
// });

router.use("/user", userRouter);
// router.use("/tour", TourRoutes)

export default router;
