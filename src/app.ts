import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // allow your Vite frontend
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! Welcome to Tour Management Server Backend.");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Route Not Found");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json(error);
  }
});

export default app;
