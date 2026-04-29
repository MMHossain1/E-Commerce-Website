import mongoose, { Schema, Document } from 'mongoose';
import { Order as IOrder } from '../types';

interface OrderDocument extends IOrder, Document {}

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'United States' },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: { type: Number, required: true },
    paymentIntentId: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model<OrderDocument>('Order', orderSchema);
