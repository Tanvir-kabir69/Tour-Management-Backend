import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import notFountRoute from "./app/utils/middlewares/notFoundRoute";
import globalErrorHandler from "./app/utils/middlewares/globalErrorHandlers";
import getAController from "./app/utils/getAController";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // allow your Vite frontend
    credentials: true,
  })
);

const baseApi: string = "/api/v1";

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello! Welcome to Tour Management Server Backend.");
// });
app.get("/", getAController);

app.use(baseApi, router);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(404).send("Route Not Found");
// });
app.use(notFountRoute);

// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   if (error) {
//     res.status(400).json(error);
//   }
// });
app.use(globalErrorHandler);

export default app;
