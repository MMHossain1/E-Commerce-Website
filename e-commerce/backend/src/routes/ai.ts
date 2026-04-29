import { Router } from 'express';
import { aiController } from '../controllers/AIController';
import { optionalAuthMiddleware } from '../middleware/auth';

const router = Router();

router.post('/chat', optionalAuthMiddleware, aiController.chat);
router.get('/recommendations', aiController.getRecommendations);
router.post('/checkout-guidance', aiController.getCheckoutGuidance);

export default router;
