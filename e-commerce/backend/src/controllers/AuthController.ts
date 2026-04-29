import { Response } from 'express';
import { AuthRequest, asyncHandler } from '../middleware/errorHandler';
import { authService } from '../services/AuthService';

export class AuthController {
  register = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  });

  login = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json(result);
  });

  googleAuth = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { googleId, email, firstName, lastName } = req.body;
    const result = await authService.googleAuth(googleId, email, firstName, lastName);
    res.json(result);
  });

  refreshTokens = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshTokens(refreshToken);
    res.json({ tokens });
  });

  getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.getProfile(req.userId!);
    res.json({ user });
  });

  updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.updateProfile(req.userId!, req.body);
    res.json({ user });
  });

  changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.userId!, oldPassword, newPassword);
    res.json({ message: 'Password changed successfully' });
  });
}

export const authController = new AuthController();
