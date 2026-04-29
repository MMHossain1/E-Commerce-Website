import { Response } from 'express';
import { AuthRequest, asyncHandler } from '../middleware/errorHandler';
import { orderService } from '../services/OrderService';

export class OrderController {
  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const order = await orderService.createOrder({
      userId: req.userId,
      ...req.body,
    });
    res.status(201).json(order);
  });

  getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const order = await orderService.getOrderById(req.params.id, req.userId);
    res.json(order);
  });

  getUserOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
    const orders = await orderService.getUserOrders(req.userId!);
    res.json(orders);
  });

  createPaymentIntent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { amount, orderId } = req.body;
    const result = await orderService.createPaymentIntent(amount, orderId);
    res.json(result);
  });

  updatePaymentStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    const order = await orderService.updateOrderPaymentStatus(orderId, paymentIntentId);
    res.json(order);
  });
}

export const orderController = new OrderController();
