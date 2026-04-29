import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import orderRoutes from './routes/orders';
import aiRoutes from './routes/ai';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
mongoose
  .connect(config.mongodbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error Handling
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

export default app;
