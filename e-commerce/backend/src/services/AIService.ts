import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import { AppError } from '../utils/errors';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export class AIService {
  async chat(message: string, context?: any): Promise<string> {
    if (!config.geminiApiKey) {
      return this.getFallbackResponse(message);
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are a helpful e-commerce shopping assistant.
${context?.cartItems ? `Current cart: ${JSON.stringify(context.cartItems)}` : ''}

User message: ${message}

Provide a helpful, concise response in 1-3 sentences.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return this.getFallbackResponse(message);
    }
  }

  async getCheckoutGuidance(cartItems: { name: string; price: number; quantity: number }[]): Promise<string[]> {
    if (!config.geminiApiKey) {
      return [
        'Review your order before confirming payment.',
        'Ensure your shipping address is correct.',
        'Your payment is secured with industry-standard encryption.',
      ];
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `A customer is checking out with these items: ${JSON.stringify(cartItems)}.
Provide 3 short, practical checkout tips as a JSON array of strings. Example: ["Tip 1", "Tip 2", "Tip 3"]`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const match = text.match(/\[[\s\S]*\]/);
      if (match) return JSON.parse(match[0]);
      return [];
    } catch {
      return [];
    }
  }

  async getRecommendations(productId?: string, category?: string): Promise<string[]> {
    if (!config.geminiApiKey) {
      return [];
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Based on ${productId ? `product ${productId}` : `category ${category}`}, suggest 3-5 related product recommendations. Return as JSON array of product names.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      try {
        return JSON.parse(response.text());
      } catch {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  private getFallbackResponse(message: string): string {
    const messageLower = message.toLowerCase();

    if (messageLower.includes('price') || messageLower.includes('cost')) {
      return 'I can help you find products within your budget. What price range are you looking for?';
    }
    if (messageLower.includes('shipping')) {
      return 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.';
    }
    if (messageLower.includes('return')) {
      return 'We have a 30-day return policy. Items must be unused and in original packaging.';
    }
    if (messageLower.includes('help')) {
      return "I'm here to help! You can ask me about products, prices, shipping, or any other questions.";
    }

    return 'How can I assist you with your shopping today?';
  }
}

export const aiService = new AIService();
