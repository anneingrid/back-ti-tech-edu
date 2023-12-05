-- CreateTable
CREATE TABLE "Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "doc" TEXT NOT NULL
);
