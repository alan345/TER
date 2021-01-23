/*
  Warnings:

  - Added the required column `resetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validateEmailToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateResetPasswordRequest` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEmailValidated` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetPasswordToken" TEXT NOT NULL,
    "validateEmailToken" TEXT NOT NULL,
    "dateResetPasswordRequest" DATETIME NOT NULL,
    "isEmailValidated" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "email", "password", "name") SELECT "id", "email", "password", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
