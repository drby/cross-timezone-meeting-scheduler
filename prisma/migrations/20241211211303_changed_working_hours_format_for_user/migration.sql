-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isLoggedIn" BOOLEAN NOT NULL DEFAULT false,
    "calendarId" INTEGER,
    "preferredTimeZone" TEXT NOT NULL DEFAULT 'UTC',
    "dailyStartTime" TEXT NOT NULL DEFAULT '09:00',
    "dailyEndTime" TEXT NOT NULL DEFAULT '17:00'
);
INSERT INTO "new_User" ("calendarId", "dailyEndTime", "dailyStartTime", "id", "isLoggedIn", "password", "preferredTimeZone", "username") SELECT "calendarId", "dailyEndTime", "dailyStartTime", "id", "isLoggedIn", "password", "preferredTimeZone", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
