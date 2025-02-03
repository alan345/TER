import { pgTable, text, integer, uuid, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const userTable = pgTable("user", {
  id: uuid().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  age: integer(),
  image: text("image"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
})

export const userCredentialTable = pgTable("user_credential", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => userTable.id),
  passwordHash: text("password_hash").notNull(),
})

export const userToUserCredentialRelations = relations(userTable, ({ one }) => ({
  userCredential: one(userCredentialTable, {
    fields: [userTable.id],
    references: [userCredentialTable.userId],
  }),
}))

export const userCredentialToUserRelations = relations(userCredentialTable, ({ one }) => ({
  user: one(userTable),
}))

export const deviceTable = pgTable("device", {
  id: uuid().defaultRandom().primaryKey(),
  userAgent: text("userAgent").notNull(),
  ip: text("ip").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
})

export const deviceToUserRelations = relations(deviceTable, ({ one }) => ({
  user: one(userTable, {
    fields: [deviceTable.userId],
    references: [userTable.id],
  }),
}))

export const userToDevicesRelations = relations(userTable, ({ many }) => ({
  devices: many(deviceTable),
}))
