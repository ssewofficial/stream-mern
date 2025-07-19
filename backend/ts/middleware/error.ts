import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../lib/env.js";
import path from "node:path";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err as any).status || 500;
  const isProduction = NODE_ENV === "production";

  const response = {
    success: false,
    error: {
      code: statusCode,
      messagee: err.message || "Internal Server Error",
      stack: isProduction ? undefined : err.stack,
    },
    path: req.originalUrl,
  };

  if (!isProduction) console.error(err);
  res.status(statusCode).json(response);
};
