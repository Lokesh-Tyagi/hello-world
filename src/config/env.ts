import { cleanEnv, str, num, bool, makeValidator } from 'envalid';

const mongoUri = makeValidator<string>((value) => {
  if (typeof value !== 'string' || !/^mongodb(\+srv)?:\/\//.test(value)) {
    throw new Error('Expected a MongoDB URI starting with mongodb:// or mongodb+srv://');
  }
  return value;
});

// Validate and export server-side environment variables
export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  MONGODB_URI: mongoUri({ desc: 'MongoDB connection string' }),
  // Optional tuning knobs with sane defaults
  MONGODB_MIN_POOL_SIZE: num({ default: 1 }),
  MONGODB_MAX_POOL_SIZE: num({ default: 10 }),
  MONGODB_CONNECT_TIMEOUT_MS: num({ default: 10000 }),
  MONGODB_SERVER_SELECTION_TIMEOUT_MS: num({ default: 10000 }),
  MONGODB_RETRY_WRITES: bool({ default: true }),
});

export type AppEnv = typeof env;


