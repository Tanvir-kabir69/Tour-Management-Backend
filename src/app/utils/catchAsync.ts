import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = <T extends RequestHandler>(fn: T) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
