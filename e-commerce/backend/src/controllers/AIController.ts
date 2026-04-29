import { Response } from 'express';
import { AuthRequest, asyncHandler } from '../middleware/errorHandler';
import { aiService } from '../services/AIService';

export class AIController {
  chat = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { message, context } = req.body;
    const reply = await aiService.chat(message, context);
    res.json({ message: reply });
  });

  getRecommendations = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { productId, category } = req.query;
    const recommendations = await aiService.getRecommendations(
      productId as string,
      category as string
    );
    res.json({ recommendations });
  });

  getCheckoutGuidance = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { cartItems } = req.body;
    const tips = await aiService.getCheckoutGuidance(cartItems || []);
    res.json({ tips });
  });
}

export const aiController = new AIController();
