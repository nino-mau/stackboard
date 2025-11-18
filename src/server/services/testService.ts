import { db } from '@/lib/db';
import { Test } from '@/schema/schema';

export const TestService = {
  async insert() {
    await db.insert(Test).values({ label: 'test' });
  }
};
