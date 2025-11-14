import dotenv from 'dotenv';
// Load .env variables BEFORE anything else
dotenv.config();

import app from './app'; // Import the configured app
import { db } from './config/db'; // Import the database connection
import { sql } from 'drizzle-orm';

const PORT = process.env.PORT || 8386;

const startServer = async () => {
  try {
    // --- 1. TEST DATABASE CONNECTION ---
    // We will run a simple "SELECT 1" query to prove the
    // database connection is working. This is the MOST LIKELY
    // point of failure.
    console.log('Attempting to connect to the database...');
    await db.execute(sql`select 1`);
    console.log('✅ Database connected successfully.');

    // --- 2. START THE SERVER ---
    // If the database connection is successful, AND ONLY THEN,
    // we start the server.
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    // --- 3. CATCH THE ERROR ---
    // If the database connection fails, this will catch the
    // error and print it, then exit the process.
    console.error('❌ FATAL ERROR: Could not connect to the database.');
    console.error(error);
    process.exit(1); // Exit with a failure code
  }
};

// --- 4. RUN ---
startServer();