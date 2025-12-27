import { pgTable, text, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './auth';

/**
 * Timestamp columns
 */
const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
};

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
