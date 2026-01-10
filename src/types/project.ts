import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { project } from '@/server/db/project';

export type Project = InferSelectModel<typeof project>;
export type NewProject = InferInsertModel<typeof project>;
