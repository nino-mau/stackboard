import { sql } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { timestamps } from './timestamp';
import { tag } from './tag';

export const projectLogoType = pgEnum('projectLogoType', ['icon', 'emoji']);

export const project = pgTable('project', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuidv7()`),
  name: text('name').notNull(),
  description: text('description'),
  repoUrl: text('repo_url'),
  logoType: projectLogoType('logo_type').default('icon').notNull(),
  logoIconName: text('logo_icon_name'),
  logoEmoji: text('logo_emoji'),
  creatorId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  ...timestamps
});

export const projectPage = pgTable('project_page', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuidv7()`),
  projectId: uuid('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  ...timestamps
});

export const projectTag = pgTable('project_tag', {
  projectId: uuid('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id')
    .notNull()
    .references(() => tag.id, { onDelete: 'cascade' }),
  ...timestamps
});
