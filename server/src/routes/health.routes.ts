import { Router, Request, Response } from 'express';
import { checkDatabaseHealth } from '../config/database';

export const healthRouter = Router();

healthRouter.get('/', async (_req: Request, res: Response) => {
  const dbHealth = await checkDatabaseHealth();

  res.status(200).json({
    status: 'ok',
    service: 'trustledger-ai-server',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    milestone: 'Milestone 2 (10–20%)',
    database: {
      connected: dbHealth.connected,
      latencyMs: dbHealth.latencyMs,
      error: dbHealth.error,
    },
  });
});
