import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',

  // JWT
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret-key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || '1h',
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',

  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',

  // Stripe
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',

  // Gemini AI
  geminiApiKey: process.env.GEMINI_API_KEY || '',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export default config;