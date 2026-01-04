'use server';

import { TagService } from '../services/tagService';

export async function getTags() {
  return await TagService.getAll();
}
