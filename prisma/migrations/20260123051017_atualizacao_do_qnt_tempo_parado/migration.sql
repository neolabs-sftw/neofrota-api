/*
  Warnings:

  - The `qnt_tempo_parado` column on the `voucher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "voucher" DROP COLUMN "qnt_tempo_parado",
ADD COLUMN     "qnt_tempo_parado" INTEGER;
