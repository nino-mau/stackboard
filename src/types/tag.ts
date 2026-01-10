import type { tag } from '@/schema/tag';
import { InferInsertModel, type InferSelectModel } from 'drizzle-orm';

// export type Tag = {
//   id: string;
//   creatable?: string;
//   name: string;
//   color: string;
// };

export type Tag = InferSelectModel<typeof tag>;

export type TagItem = Tag & { isCreatable?: boolean };
// export type NewProject = InferInsertModel<typeof project>;
