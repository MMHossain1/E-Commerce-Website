import mongoose, { Schema, Document } from 'mongoose';
import { User as IUser } from '../types';

interface UserDocument extends IUser, Document {}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'United States' },
    avatar: String,
    googleId: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>('User', userSchema);
