import { MongoServerError } from "mongodb";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../interfacesAndTpes/genericErrorResponse";

const handleMongooseDuplicateError = (
  err: MongoServerError
): TGenericErrorResponse => {
  const duplicateField = Object.keys(err.keyValue || {})[0];
  const duplicateValue = err.keyValue?.[duplicateField];

  const errorSources: TErrorSources = [
    {
      path: duplicateField,
      message: `Duplicate value for "${duplicateField}": "${duplicateValue}". It must be unique.`,
    },
  ];

  return {
    success: false,
    message: "Duplicate key error",
    statusCode: 409,
    error: err,
    errorSources,
    stack: err.stack ? err.stack : "",
  };
};

export default handleMongooseDuplicateError;
