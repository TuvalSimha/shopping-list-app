-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT DEFAULT 'New List',
    "name" TEXT NOT NULL DEFAULT 'New List',
    "tag" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_List" ("createdAt", "description", "id", "name", "tag") SELECT "createdAt", "description", "id", "name", "tag" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
