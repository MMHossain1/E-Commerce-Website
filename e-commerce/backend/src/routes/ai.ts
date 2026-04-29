import { Router } from 'express';
import { aiController } from '../controllers/AIController';
import { optionalAuthMiddleware } from '../middleware/auth';

const router = Router();

router.post('/chat', optionalAuthMiddleware, aiController.chat);
router.get('/recommendations', aiController.getRecommendations);

export default router;
