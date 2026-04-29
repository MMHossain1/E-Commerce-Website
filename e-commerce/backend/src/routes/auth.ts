import { Router } from 'express';
import { authController } from '../controllers/AuthController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const googleAuthSchema = z.object({
  googleId: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8),
});

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/google', validateRequest(googleAuthSchema), authController.googleAuth);
router.post('/refresh', authController.refreshTokens);
router.get('/me', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.post('/change-password', authMiddleware, validateRequest(changePasswordSchema), authController.changePassword);

export default router;
