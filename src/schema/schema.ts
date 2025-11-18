import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique()
});

export const Test = pgTable('test', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: varchar({ length: 255 }).notNull()
});
