/*
  Warnings:

  - Added the required column `operadora_id` to the `lancamento_motorista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lancamento_motorista" ADD COLUMN     "operadora_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "lancamento_motorista" ADD CONSTRAINT "lancamento_motorista_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
