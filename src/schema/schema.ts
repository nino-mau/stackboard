import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const Test = pgTable('test', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: varchar({ length: 255 }).notNull()
});
