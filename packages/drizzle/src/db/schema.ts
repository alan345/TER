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
    .references(() => userTable.id),
  passwordHash: text("password_hash").notNull(),
})

// // Define relations in `userCredentialTable`
// export const userCredentialRelations = relations(userCredentialTable, ({ one }) => ({
//   user: one(userTable, {
//     fields: [userCredentialTable.userId],
//     references: [userTable.id],
//   }),
// }))

export const userRelations = relations(userTable, ({ one }) => ({
  userCredential: one(userCredentialTable, {
    fields: [userTable.id], // Ensure it links correctly
    references: [userCredentialTable.userId],
  }),
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

// Define relations in `deviceTable`
export const deviceUserRelations = relations(deviceTable, ({ one }) => ({
  user: one(userTable, {
    fields: [deviceTable.userId],
    references: [userTable.id],
  }),
}))

// Define `userDeviceRelations` properly in `userTable`
export const userDeviceRelations = relations(userTable, ({ many }) => ({
  devices: many(deviceTable),
}))
