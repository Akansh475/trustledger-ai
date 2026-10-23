import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load from project root .env or current working directory .env if present
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_URL: z.string().default('http://localhost:5173'),

  // Database configuration (Milestone 2)
  DATABASE_URL: z
    .string()
    .optional()
    .transform((val) => (val && val.trim() !== '' ? val : undefined)),
  PAYPAL_MODE: z.enum(['sandbox', 'live']).optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_API_BASE: z.string().optional(),
  PAYPAL_WEBHOOK_ID: z.string().optional(),
  LLM_API_KEY: z.string().optional(),
  LLM_MODEL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
