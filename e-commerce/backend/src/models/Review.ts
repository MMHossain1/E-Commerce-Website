import mongoose, { Schema, Document } from 'mongoose';
import { Review as IReview } from '../types';

interface ReviewDocument extends IReview, Document {}

const reviewSchema = new Schema<ReviewDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);
