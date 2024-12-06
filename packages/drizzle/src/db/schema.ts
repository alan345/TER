import { pgTable, varchar, integer, uuid, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: integer(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  devices: many(devicesTable),
}))

export const devicesTable = pgTable("devices", {
  id: uuid().defaultRandom().primaryKey(),
  userAgent: varchar().notNull(),
  ip: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  userId: uuid("user_id").notNull(),
})

export const devicesRelations = relations(devicesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [devicesTable.userId],
    references: [usersTable.id],
  }),
}))
