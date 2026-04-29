import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JWTPayload } from '../types';

export const generateTokens = (userId: string, email: string) => {
  const access = jwt.sign({ userId, email }, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpiry,
  });

  const refresh = jwt.sign({ userId, email }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiry,
  });

  return { access, refresh };
};

export const verifyAccessToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, config.jwtAccessSecret) as JWTPayload;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as JWTPayload;
  } catch {
    return null;
  }
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload | null;
  } catch {
    return null;
  }
};