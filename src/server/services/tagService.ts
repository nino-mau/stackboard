import { db } from '@/lib/db';
import { tag } from '@/schema/tag';

export const TagService = {
  async getAll() {
    return await db.select().from(tag);
  }
};
