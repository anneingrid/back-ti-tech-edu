-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pergunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cursoRelacionado" TEXT NOT NULL,
    "dataPergunta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "like" INTEGER
);
INSERT INTO "new_Pergunta" ("cursoRelacionado", "dataPergunta", "descricao", "id", "idUsuario", "like", "titulo") SELECT "cursoRelacionado", "dataPergunta", "descricao", "id", "idUsuario", "like", "titulo" FROM "Pergunta";
DROP TABLE "Pergunta";
ALTER TABLE "new_Pergunta" RENAME TO "Pergunta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
