import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../utils/errors';

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'No authentication token provided');
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      throw new AppError(401, 'Invalid or expired token');
    }

    req.userId = payload.userId;
    req.email = payload.email;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};

export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    const payload = verifyAccessToken(token);
    if (payload) {
      req.userId = payload.userId;
      req.email = payload.email;
    }
  }

  next();
};
