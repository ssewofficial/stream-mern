import { Route } from "../types.js";

export const notFound: Route = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  (error as any).status = 404;
  next(error);
};
