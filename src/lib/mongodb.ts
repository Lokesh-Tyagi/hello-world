import mongoose from 'mongoose';
import { env } from '@/config/env';

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

declare global {
  var __mongooseConnection: {
    cachedPromise: Promise<typeof mongoose> | null;
    state: ConnectionState;
    lastError?: unknown;
    lastConnectedAt?: number;
  } | undefined;
}

const globalCache = global.__mongooseConnection ?? {
  cachedPromise: null,
  state: 'disconnected' as ConnectionState,
  lastError: undefined,
  lastConnectedAt: undefined,
};

if (!global.__mongooseConnection) {
  global.__mongooseConnection = globalCache;
}

function buildMongooseOptions(): Parameters<typeof mongoose.connect>[1] {
  return {
    autoIndex: env.isDev,
    maxPoolSize: env.MONGODB_MAX_POOL_SIZE,
    minPoolSize: env.MONGODB_MIN_POOL_SIZE,
    serverSelectionTimeoutMS: env.MONGODB_SERVER_SELECTION_TIMEOUT_MS,
    connectTimeoutMS: env.MONGODB_CONNECT_TIMEOUT_MS,
    retryWrites: env.MONGODB_RETRY_WRITES,
  } as Parameters<typeof mongoose.connect>[1];
}

async function connectOnce(): Promise<typeof mongoose> {
  if (globalCache.state === 'connected') {
    return mongoose;
  }

  globalCache.state = 'connecting';
  try {
    await mongoose.connect(env.MONGODB_URI, buildMongooseOptions());
    globalCache.state = 'connected';
    globalCache.lastConnectedAt = Date.now();
    return mongoose;
  } catch (error) {
    globalCache.state = 'disconnected';
    globalCache.lastError = error;
    throw error;
  }
}

export async function connectToMongoDB(): Promise<typeof mongoose> {
  if (!globalCache.cachedPromise) {
    // Exponential backoff retry strategy
    const maxAttempts = 5;
    const baseDelayMs = 300;
    globalCache.cachedPromise = (async () => {
      let attempt = 0;
      while (true) {
        try {
          return await connectOnce();
        } catch (error) {
          attempt += 1;
          if (attempt >= maxAttempts || !shouldRetry(error)) {
            throw error;
          }
          const delay = Math.min(5000, baseDelayMs * 2 ** (attempt - 1));
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    })();
  }
  return globalCache.cachedPromise;
}

function shouldRetry(error: unknown): boolean {
  // Retry network/selection-timeout-like errors
  let message = '';
  if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
    message = (error as { message: string }).message;
  } else {
    message = String(error);
  }
  return /ECONNREFUSED|ENOTFOUND|ETIMEOUT|EAI_AGAIN|ServerSelection/g.test(message);
}

export async function disconnectFromMongoDB(): Promise<void> {
  if (globalCache.state === 'connected' || globalCache.state === 'connecting') {
    await mongoose.disconnect();
  }
  globalCache.cachedPromise = null;
  globalCache.state = 'disconnected';
}

export function getMongoHealth() {
  const states: Record<number, ConnectionState> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const currentState = states[mongoose.connection.readyState] ?? 'disconnected';
  return {
    state: currentState,
    lastConnectedAt: globalCache.lastConnectedAt,
    hasError: Boolean(globalCache.lastError),
  };
}


