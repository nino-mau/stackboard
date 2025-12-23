import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db'; // your drizzle instance
import { nextCookies } from 'better-auth/next-js';
import * as authSchema from '@/schema/auth';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema
  }),
  plugins: [nextCookies()],
  advanced: {
    database: {
      // Let drizzle generate the id
      generateId: false
    }
  }
});
