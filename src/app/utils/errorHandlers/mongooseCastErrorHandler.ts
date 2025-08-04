import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../interfacesAndTpes/genericErrorResponse";

const handleMongooseCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: `Invalid value for ${err.path}: ${err.value}`,
    },
  ];

  return {
    success: false,
    message: "Cast Error",
    statusCode: 400,
    error: err,
    errorSources,
    stack: err.stack ? err.stack : "",
  };
};

export default handleMongooseCastError;
