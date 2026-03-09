/*
  Warnings:

  - You are about to drop the column `dias_semana` on the `modelo_voucher_fixo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modelo_voucher_fixo" DROP COLUMN "dias_semana",
ADD COLUMN     "domingo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quarta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quinta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sabado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "segunda" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sexta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terca" BOOLEAN NOT NULL DEFAULT false;
