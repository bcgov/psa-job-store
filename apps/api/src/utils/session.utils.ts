import connectPg from 'connect-pg-simple';
import session from 'express-session';
import connectMemoryStore from 'memorystore';

const MemorySessionStore = connectMemoryStore(session);
const PostgresSessionStore = connectPg(session);

const pgSessionStore = new PostgresSessionStore({
  conObject: {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  },
  tableName: '_session',
});

const memorySessionStore = new MemorySessionStore({
  checkPeriod: 24 * 60 * 60 * 1000, // prune expired sessions every 24 hours
});

export const getSessionStore = () => {
  if (process.env.E2E_TESTING === 'true') {
    if (process.env.NODE_ENV === 'development') {
      return pgSessionStore;
    } else {
      return memorySessionStore;
    }
  } else {
    return pgSessionStore;
  }
};
