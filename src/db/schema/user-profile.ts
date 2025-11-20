import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user_profile = sqliteTable('user_profile', {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  user_id: text().notNull(),
  email: text().notNull(),
  display_name: text().notNull(),
  created_at: int()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  profile_image_url: text()
});
