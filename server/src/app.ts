import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { healthRouter } from './routes/health.routes';

export const app = express();

// Middleware
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/api/health', healthRouter);

// Root informational endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'TrustLedger AI API',
    description: 'AI-Powered Financial Reconciliation Platform',
    status: 'running',
    healthEndpoint: '/health',
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
