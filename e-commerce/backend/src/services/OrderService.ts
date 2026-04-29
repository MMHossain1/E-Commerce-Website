import Stripe from 'stripe';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { AppError } from '../utils/errors';
import { config } from '../config';
import { Order as IOrder, OrderItem } from '../types';

const stripe = new Stripe(config.stripeSecretKey);

export class OrderService {
  async createOrder(data: {
    userId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    items: OrderItem[];
  }): Promise<IOrder> {
    let totalAmount = 0;

    for (const item of data.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new AppError(404, `Product ${item.productId} not found`);
      }

      totalAmount += item.price * item.quantity;

      if (product.stock < item.quantity) {
        throw new AppError(400, `Insufficient stock for ${product.name}`);
      }
    }

    const order = new Order({
      ...data,
      totalAmount,
    });

    await order.save();

    // Update product stock
    for (const item of data.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    return order.toObject() as IOrder;
  }

  async getOrderById(id: string, userId?: string): Promise<IOrder> {
    const query: any = { _id: id };
    if (userId) {
      query.userId = userId;
    }

    const order = await Order.findOne(query).populate('items.productId');

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order.toObject() as IOrder;
  }

  async getUserOrders(userId: string): Promise<IOrder[]> {
    const orders = await Order.find({ userId }).populate('items.productId').sort({ createdAt: -1 });
    return orders.map((o) => o.toObject() as IOrder);
  }

  async createPaymentIntent(amount: number, orderId: string): Promise<{ clientSecret: string }> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: { orderId },
    });

    return { clientSecret: paymentIntent.client_secret || '' };
  }

  async updateOrderPaymentStatus(orderId: string, paymentIntentId: string): Promise<IOrder> {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentIntentId,
        status: 'processing',
      },
      { new: true }
    );

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order.toObject() as IOrder;
  }
}

export const orderService = new OrderService();
