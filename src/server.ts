import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config";

let server: Server;

const bootstrap = async () => {
  try {
    await mongoose.connect(`${envVars.DB_URL}`);
    console.log("Successfully  connected to mongoDB.");
    server = await app.listen(envVars.PORT, () => {
      console.log(`Example app listening on PORT ${envVars.PORT}.`);
    });
  } catch (err) {
    throw new Error("Problems in starting server");
  }
};

bootstrap();

process.on("SIGTERM", () => {
  console.log("Signal Termination received. Server is shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandeled Rejection detected. Server is shutting down...");
  console.log(err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected. Server is shutting down...");
  console.log(err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// unhandled rejection
// uncaught rejection error
// signal termination
