import { Router } from 'express';
import { orderController } from '../controllers/OrderController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

const createOrderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
});

const createPaymentIntentSchema = z.object({
  amount: z.number().min(0.01),
  orderId: z.string(),
});

router.post('/', validateRequest(createOrderSchema), orderController.create);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getById);
router.post('/payment/intent', authMiddleware, validateRequest(createPaymentIntentSchema), orderController.createPaymentIntent);
router.post('/payment/status', authMiddleware, orderController.updatePaymentStatus);

export default router;
