import { app } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

const server = app.listen(env.PORT, async () => {
  console.log(`TrustLedger AI Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  console.log(`Health endpoint: http://localhost:${env.PORT}/health`);

  if (env.DATABASE_URL) {
    await connectDatabase();
  } else {
    console.log('[Database] No DATABASE_URL set. Running without active database connection.');
  }
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down server...`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

export default server;
