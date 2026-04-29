import mongoose, { Schema, Document } from 'mongoose';
import { Category as ICategory } from '../types';

interface CategoryDocument extends ICategory, Document {}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export const Category = mongoose.model<CategoryDocument>('Category', categorySchema);
