import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/server/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_LOCAL_URL
  }
});
