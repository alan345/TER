import { pgTable, varchar, integer, uuid, timestamp } from "drizzle-orm/pg-core"
export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: integer(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
