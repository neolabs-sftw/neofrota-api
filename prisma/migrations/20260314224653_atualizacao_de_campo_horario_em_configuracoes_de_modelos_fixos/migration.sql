/*
  Warnings:

  - You are about to drop the `configuracao_viagem_fixa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "configuracao_viagem_fixa" DROP CONSTRAINT "configuracao_viagem_fixa_carro_id_fkey";

-- DropForeignKey
ALTER TABLE "configuracao_viagem_fixa" DROP CONSTRAINT "configuracao_viagem_fixa_modelo_fixo_id_fkey";

-- DropForeignKey
ALTER TABLE "configuracao_viagem_fixa" DROP CONSTRAINT "configuracao_viagem_fixa_motorista_id_fkey";

-- DropTable
DROP TABLE "configuracao_viagem_fixa";

-- CreateTable
CREATE TABLE "modelo_voucher_fixo_config" (
    "id" SERIAL NOT NULL,
    "modelo_fixo_id" INTEGER NOT NULL,
    "tipo_corrida" "TipoCorrida" NOT NULL,
    "horario" TEXT NOT NULL,
    "domingo" BOOLEAN NOT NULL DEFAULT false,
    "segunda" BOOLEAN NOT NULL DEFAULT false,
    "terca" BOOLEAN NOT NULL DEFAULT false,
    "quarta" BOOLEAN NOT NULL DEFAULT false,
    "quinta" BOOLEAN NOT NULL DEFAULT false,
    "sexta" BOOLEAN NOT NULL DEFAULT false,
    "sabado" BOOLEAN NOT NULL DEFAULT false,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "motorista_id" BIGINT NOT NULL,
    "carro_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_voucher_fixo_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modelo_voucher_fixo_config_modelo_fixo_id_tipo_corrida_key" ON "modelo_voucher_fixo_config"("modelo_fixo_id", "tipo_corrida");

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo_config" ADD CONSTRAINT "modelo_voucher_fixo_config_modelo_fixo_id_fkey" FOREIGN KEY ("modelo_fixo_id") REFERENCES "modelo_voucher_fixo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo_config" ADD CONSTRAINT "modelo_voucher_fixo_config_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo_config" ADD CONSTRAINT "modelo_voucher_fixo_config_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
