/*
  Warnings:

  - A unique constraint covering the columns `[idUsuario]` on the table `Preferencia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Preferencia_idUsuario_key" ON "Preferencia"("idUsuario");
