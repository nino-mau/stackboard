import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db'; // your drizzle instance
import { nextCookies } from 'better-auth/next-js';
import * as authSchema from '@/schema/auth-schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema
  }),
  plugins: [nextCookies()]
});
