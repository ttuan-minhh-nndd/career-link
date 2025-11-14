import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg'; // Import PoolConfig
import dotenv from 'dotenv';
import * as schema from '../models/schema';

// Load variables from .env.local (this is a fallback)
dotenv.config({ path: '.env.local' });

// --- MODIFICATION ---
// This file is now "environment-aware"

let poolConfig: PoolConfig; // Declare a variable for our config

if (process.env.NODE_ENV === 'production') {
  // --- PRODUCTION CONFIG ---
  // Use the single DATABASE_URL provided by Render
  console.log('Running in production mode. Using DATABASE_URL.');
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set for production');
  }
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for most cloud providers
    },
  };
} else {
  // --- LOCAL DEVELOPMENT CONFIG ---
  // Use the individual variables from .env.local
  console.log('Running in development mode. Using local DB variables.');
  console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  // Don't log password in production!
});
  if (
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME
  ) {
    throw new Error('One or more local database variables are not set in .env.local');
  }
  poolConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10), // Port must be a number
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false, // No SSL for local
  };
}

// Create the connection pool using the determined config
const pool = new Pool(poolConfig);

// Create the Drizzle instance
export const db = drizzle(pool, { schema });