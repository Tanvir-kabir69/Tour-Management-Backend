import { ZodError } from "zod";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../interfacesAndTpes/genericErrorResponse";

const handleZodValidationError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue) => ({
    path: issue.path.join("."), // Handles nested fields like user.name
    message: issue.message,
  }));

  return {
    success: false,
    message: "Zod Validation Error",
    statusCode: 400,
    error: err,
    errorSources,
    stack: err.stack ? err.stack : "",
  };
};

export default handleZodValidationError;
