-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "perguntaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL
);
INSERT INTO "new_Like" ("id", "perguntaId", "usuarioId") SELECT "id", "perguntaId", "usuarioId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
CREATE UNIQUE INDEX "Like_perguntaId_usuarioId_key" ON "Like"("perguntaId", "usuarioId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
