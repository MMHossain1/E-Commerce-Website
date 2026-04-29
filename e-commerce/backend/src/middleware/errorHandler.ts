import { Request, Response, NextFunction } from 'express';
import { AppError, handleError } from '../utils/errors';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  const { statusCode, message } = handleError(err);
  res.status(statusCode).json({
    error: message,
    statusCode,
  });
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
