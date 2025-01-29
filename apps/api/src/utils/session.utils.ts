import connectPg from 'connect-pg-simple';
import session from 'express-session';
import connectMemoryStore from 'memorystore';

let pgSessionStore;
if (process.env.E2E_TESTING !== 'true' || process.env.NODE_ENV === 'development') {
  const PostgresSessionStore = connectPg(session);

  pgSessionStore = new PostgresSessionStore({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    },
    tableName: '_session',
  });
}

const MemorySessionStore = connectMemoryStore(session);
const memorySessionStore = new MemorySessionStore({
  checkPeriod: 24 * 60 * 60 * 1000, // prune expired sessions every 24 hours
});

export const getSessionStore = () => {
  if (process.env.E2E_TESTING === 'true') {
    if (process.env.NODE_ENV === 'development') {
      // e2e testing and running locally - run off actual db
      return pgSessionStore;
    } else {
      // e2e testing and running in prod - run off memory store
      return memorySessionStore;
    }
  } else {
    // not e2e testing - run off actual db
    return pgSessionStore;
  }
};
