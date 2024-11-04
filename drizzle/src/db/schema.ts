import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core"
export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
})
