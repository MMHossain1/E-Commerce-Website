import { User } from '../models/User';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { AppError } from '../utils/errors';
import { AuthPayload, User as IUser } from '../types';

export class AuthService {
  async register(data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthPayload> {
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      throw new AppError(400, 'Email or username already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = new User({
      ...data,
      password: hashedPassword,
    });

    await user.save();

    const { access, refresh } = generateTokens(user._id!.toString(), user.email);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword as IUser,
      tokens: { access, refresh },
    };
  }

  async login(username: string, password: string): Promise<AuthPayload> {
    const user = await User.findOne({ username });

    if (!user || !user.password) {
      throw new AppError(401, 'Invalid credentials');
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new AppError(401, 'Invalid credentials');
    }

    const { access, refresh } = generateTokens(user._id!.toString(), user.email);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword as IUser,
      tokens: { access, refresh },
    };
  }

  async googleAuth(googleId: string, email: string, firstName: string, lastName: string): Promise<AuthPayload> {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });

      if (!user) {
        const username = email.split('@')[0];
        user = new User({
          username: `${username}_${Date.now()}`,
          email,
          firstName,
          lastName,
          googleId,
        });
        await user.save();
      } else {
        user.googleId = googleId;
        await user.save();
      }
    }

    const { access, refresh } = generateTokens(user._id!.toString(), user.email);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword as IUser,
      tokens: { access, refresh },
    };
  }

  async refreshTokens(refreshToken: string): Promise<{ access: string; refresh: string }> {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      throw new AppError(401, 'Invalid refresh token');
    }

    const user = await User.findById(payload.userId);

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    const { access, refresh } = generateTokens(user._id!.toString(), user.email);

    return { access, refresh };
  }

  async getProfile(userId: string): Promise<IUser> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword as IUser;
  }

  async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser> {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword as IUser;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(userId);

    if (!user || !user.password) {
      throw new AppError(401, 'User not found');
    }

    const isValidPassword = await comparePassword(oldPassword, user.password);

    if (!isValidPassword) {
      throw new AppError(401, 'Invalid current password');
    }

    user.password = await hashPassword(newPassword);
    await user.save();
  }
}

export const authService = new AuthService();
