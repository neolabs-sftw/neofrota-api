/*
  Warnings:

  - The values [Dom,Seg,Ter,Qua,Qui,Sex,Sab] on the enum `DiaDaSemana` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `carro_id` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `data_fim` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `data_inicio` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `destino` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `motorista_id` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_corrida` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `valor_estacionamento` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `valor_estacionamento_repasse` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `valor_pedagio_repasse` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `valor_tempo_parado` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to drop the column `valor_tempo_parado_repasse` on the `modelo_voucher_fixo` table. All the data in the column will be lost.
  - You are about to alter the column `valor_pedagio` on the `modelo_voucher_fixo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - Added the required column `unidade_cliente_id` to the `modelo_voucher_fixo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_deslocamento` to the `modelo_voucher_fixo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_deslocamento_repasse` to the `modelo_voucher_fixo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_hora_parada` to the `modelo_voucher_fixo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_hora_parada_repasse` to the `modelo_voucher_fixo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DiaDaSemana_new" AS ENUM ('Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado');
ALTER TABLE "modelo_voucher_fixo" ALTER COLUMN "dias_semana" TYPE "DiaDaSemana_new"[] USING ("dias_semana"::text::"DiaDaSemana_new"[]);
ALTER TABLE "modelo_voucher_turno" ALTER COLUMN "dias_semana" TYPE "DiaDaSemana_new"[] USING ("dias_semana"::text::"DiaDaSemana_new"[]);
ALTER TYPE "DiaDaSemana" RENAME TO "DiaDaSemana_old";
ALTER TYPE "DiaDaSemana_new" RENAME TO "DiaDaSemana";
DROP TYPE "public"."DiaDaSemana_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "modelo_voucher_fixo" DROP CONSTRAINT "modelo_voucher_fixo_carro_id_fkey";

-- DropForeignKey
ALTER TABLE "modelo_voucher_fixo" DROP CONSTRAINT "modelo_voucher_fixo_motorista_id_fkey";

-- AlterTable
ALTER TABLE "modelo_voucher_fixo" DROP COLUMN "carro_id",
DROP COLUMN "data_fim",
DROP COLUMN "data_inicio",
DROP COLUMN "destino",
DROP COLUMN "horario",
DROP COLUMN "motorista_id",
DROP COLUMN "origem",
DROP COLUMN "tipo_corrida",
DROP COLUMN "valor_estacionamento",
DROP COLUMN "valor_estacionamento_repasse",
DROP COLUMN "valor_pedagio_repasse",
DROP COLUMN "valor_tempo_parado",
DROP COLUMN "valor_tempo_parado_repasse",
ADD COLUMN     "unidade_cliente_id" BIGINT NOT NULL,
ADD COLUMN     "valor_deslocamento" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "valor_deslocamento_repasse" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "valor_hora_parada" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "valor_hora_parada_repasse" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "valor_pedagio" DROP NOT NULL,
ALTER COLUMN "valor_pedagio" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "configuracao_viagem_fixa" (
    "id" SERIAL NOT NULL,
    "modelo_fixo_id" INTEGER NOT NULL,
    "tipo_corrida" "TipoCorrida" NOT NULL,
    "horario" TIME NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "motorista_id" BIGINT NOT NULL,
    "carro_id" INTEGER NOT NULL,

    CONSTRAINT "configuracao_viagem_fixa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuracao_viagem_fixa_modelo_fixo_id_tipo_corrida_key" ON "configuracao_viagem_fixa"("modelo_fixo_id", "tipo_corrida");

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_unidade_cliente_id_fkey" FOREIGN KEY ("unidade_cliente_id") REFERENCES "unidade_empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_valor_pedagio_fkey" FOREIGN KEY ("valor_pedagio") REFERENCES "pedagio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracao_viagem_fixa" ADD CONSTRAINT "configuracao_viagem_fixa_modelo_fixo_id_fkey" FOREIGN KEY ("modelo_fixo_id") REFERENCES "modelo_voucher_fixo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracao_viagem_fixa" ADD CONSTRAINT "configuracao_viagem_fixa_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracao_viagem_fixa" ADD CONSTRAINT "configuracao_viagem_fixa_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
