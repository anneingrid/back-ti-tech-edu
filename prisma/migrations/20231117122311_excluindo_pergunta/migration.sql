-- CreateTable
CREATE TABLE "Pergunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cursoRelacionado" TEXT NOT NULL,
    "dataPergunta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataComentario" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "perguntaId" INTEGER,
    CONSTRAINT "Comentario_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "Pergunta" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
