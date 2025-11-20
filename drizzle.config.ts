import type { Config } from 'drizzle-kit';

import dotenv from 'dotenv';

import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: '.env.local'
});

export default defineConfig({
  schema: './src/db/schema',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!
  }
}) satisfies Config;
