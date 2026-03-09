/*
  Warnings:

  - You are about to drop the column `domingo` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `quarta` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `quinta` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `sabado` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `segunda` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `sexta` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `terca` on the `modelo_voucher_fixo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configuracao_viagem_fixa" ADD COLUMN     "domingo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quarta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quinta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sabado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "segunda" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sexta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terca" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "modelo_voucher_fixo" DROP COLUMN "domingo",
DROP COLUMN "quarta",
DROP COLUMN "quinta",
DROP COLUMN "sabado",
DROP COLUMN "segunda",
DROP COLUMN "sexta",
DROP COLUMN "terca";
