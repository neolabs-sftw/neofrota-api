/*
  Warnings:

  - A unique constraint covering the columns `[rota_id,categoria]` on the table `rota_valor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rota_valor_rota_id_categoria_key" ON "rota_valor"("rota_id", "categoria");
