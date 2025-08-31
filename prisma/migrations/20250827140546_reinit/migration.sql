/*
  Warnings:

  - You are about to drop the column `name` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `stocke` on the `Articles` table. All the data in the column will be lost.
  - Added the required column `prix` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titre` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Articles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Articles" ("createdAt", "description", "id", "images", "updatedAt", "userId") SELECT "createdAt", "description", "id", "images", "updatedAt", "userId" FROM "Articles";
DROP TABLE "Articles";
ALTER TABLE "new_Articles" RENAME TO "Articles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
