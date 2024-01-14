-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New List',
    "tag" TEXT
);
INSERT INTO "new_List" ("createdAt", "description", "id", "name", "tag") SELECT "createdAt", "description", "id", coalesce("name", 'New List') AS "name", "tag" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
