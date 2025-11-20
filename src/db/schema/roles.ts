import { clubs } from '@/db/schema/clubs';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const roles = sqliteTable('roles', {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull(),
  permissions: text().notNull(),
  clubId: int()
    .references(() => clubs.id)
    .notNull()
});
