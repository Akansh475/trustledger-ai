import { PrismaClient } from '@prisma/client';
import { env } from './env';

// Prevent multiple Prisma Client instances in development due to module reloading
declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

const isProduction = env.NODE_ENV === 'production';

export const prisma =
  global.__prismaClient ??
  new PrismaClient({
    log: isProduction ? ['error'] : ['warn', 'error'],
    datasources: env.DATABASE_URL
      ? {
          db: {
            url: env.DATABASE_URL,
          },
        }
      : undefined,
  });

if (!isProduction) {
  global.__prismaClient = prisma;
}

export interface DatabaseHealthResult {
  connected: boolean;
  latencyMs?: number;
  error?: string;
}

/**
 * Checks database connectivity with a lightweight ping query.
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  if (!env.DATABASE_URL) {
    return {
      connected: false,
      error: 'DATABASE_URL is not set in environment',
    };
  }

  const startTime = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      latencyMs: Date.now() - startTime,
    };
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}

/**
 * Connect to PostgreSQL via Prisma Client.
 */
export async function connectDatabase(): Promise<boolean> {
  if (!env.DATABASE_URL) {
    console.warn('[Database] DATABASE_URL not configured. Database operations are unavailable.');
    return false;
  }

  try {
    await prisma.$connect();
    console.log('[Database] Connected to PostgreSQL via Prisma successfully.');
    return true;
  } catch (error) {
    console.error(
      '[Database] Failed to connect to PostgreSQL:',
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Disconnect Prisma Client cleanly during shutdown.
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log('[Database] Disconnected Prisma Client.');
  } catch (error) {
    console.error(
      '[Database] Error during disconnect:',
      error instanceof Error ? error.message : error
    );
  }
}

// Lifecycle listeners for clean process termination
process.on('beforeExit', async () => {
  await disconnectDatabase();
});
