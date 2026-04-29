import mongoose, { Schema, Document } from 'mongoose';
import { Product as IProduct } from '../types';

interface ProductDocument extends IProduct, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: String,
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.model<ProductDocument>('Product', productSchema);
